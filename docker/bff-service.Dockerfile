# ===========================================
# Bokka BFF Service Dockerfile (Hono)
# ===========================================
# Build args:
#   BFF_TYPE: "users" or "managers"
# ===========================================

# Base stage with pnpm
FROM node:22-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@9.15.1 --activate

# Dependencies stage
FROM base AS deps
WORKDIR /app

# Copy workspace configuration
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./

# Copy all package.json files for workspace resolution
COPY packages/proto/package.json ./packages/proto/
COPY packages/shared/package.json ./packages/shared/
COPY tools/typescript/package.json ./tools/typescript/
COPY tools/vitest/package.json ./tools/vitest/
COPY tools/biome/package.json ./tools/biome/

# Copy the target service package.json
ARG BFF_TYPE
COPY apps/${BFF_TYPE}/bff/cli/package.json ./apps/${BFF_TYPE}/bff/cli/

# Install dependencies
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# Builder stage
FROM base AS builder
WORKDIR /app

ARG BFF_TYPE

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages/proto/node_modules ./packages/proto/node_modules
COPY --from=deps /app/packages/shared/node_modules ./packages/shared/node_modules
COPY --from=deps /app/tools/typescript/node_modules ./tools/typescript/node_modules
COPY --from=deps /app/tools/vitest/node_modules ./tools/vitest/node_modules
COPY --from=deps /app/apps/${BFF_TYPE}/bff/cli/node_modules ./apps/${BFF_TYPE}/bff/cli/node_modules

# Copy source files
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY packages/ ./packages/
COPY tools/ ./tools/
COPY apps/${BFF_TYPE}/bff/cli/ ./apps/${BFF_TYPE}/bff/cli/

# Build the service
RUN pnpm --filter "@${BFF_TYPE}-apps/bff-cli" build

# Runner stage
FROM base AS runner
WORKDIR /app

ARG BFF_TYPE

ENV NODE_ENV=production

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 hono

# Copy built artifacts
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages/proto/gen ./packages/proto/gen
COPY --from=builder /app/packages/proto/package.json ./packages/proto/package.json
COPY --from=builder /app/packages/shared/dist ./packages/shared/dist
COPY --from=builder /app/packages/shared/package.json ./packages/shared/package.json
COPY --from=builder /app/apps/${BFF_TYPE}/bff/cli/dist ./dist
COPY --from=builder /app/apps/${BFF_TYPE}/bff/cli/package.json ./package.json

USER hono

EXPOSE 3000

CMD ["node", "dist/server.js"]
