# ===========================================
# Bokka Core Service Dockerfile (NestJS)
# ===========================================
# Build args:
#   SERVICE_PATH: e.g., "bookmarks/organizer/read"
#   SERVICE_PACKAGE: e.g., "bookmarks-cores/organizer-read"
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
ARG SERVICE_PATH
COPY apps/cores/${SERVICE_PATH}/package.json ./apps/cores/${SERVICE_PATH}/

# Install dependencies
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# Builder stage
FROM base AS builder
WORKDIR /app

ARG SERVICE_PATH
ARG SERVICE_PACKAGE

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages/proto/node_modules ./packages/proto/node_modules
COPY --from=deps /app/packages/shared/node_modules ./packages/shared/node_modules
COPY --from=deps /app/tools/typescript/node_modules ./tools/typescript/node_modules
COPY --from=deps /app/tools/vitest/node_modules ./tools/vitest/node_modules
COPY --from=deps /app/apps/cores/${SERVICE_PATH}/node_modules ./apps/cores/${SERVICE_PATH}/node_modules

# Copy source files
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY packages/ ./packages/
COPY tools/ ./tools/
COPY apps/cores/${SERVICE_PATH}/ ./apps/cores/${SERVICE_PATH}/

# Build the service
RUN pnpm --filter "@${SERVICE_PACKAGE}" build

# Runner stage
FROM base AS runner
WORKDIR /app

ARG SERVICE_PATH

ENV NODE_ENV=production

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nestjs

# Copy built artifacts
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages/proto/gen ./packages/proto/gen
COPY --from=builder /app/packages/proto/package.json ./packages/proto/package.json
COPY --from=builder /app/packages/shared/dist ./packages/shared/dist
COPY --from=builder /app/packages/shared/package.json ./packages/shared/package.json
COPY --from=builder /app/apps/cores/${SERVICE_PATH}/dist ./dist
COPY --from=builder /app/apps/cores/${SERVICE_PATH}/package.json ./package.json

USER nestjs

EXPOSE 3000 50051

CMD ["node", "dist/main.js"]
