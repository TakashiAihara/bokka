# Bookmarks Organizer Read Service
FROM node:22-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@9.15.1 --activate

# Dependencies stage
FROM base AS deps
WORKDIR /app

# Copy workspace configuration files
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./

# Copy package.json files for workspace resolution
COPY packages/proto/package.json ./packages/proto/
COPY packages/shared/package.json ./packages/shared/
COPY tools/typescript/package.json ./tools/typescript/
COPY tools/vitest/package.json ./tools/vitest/
COPY tools/biome/package.json ./tools/biome/
COPY apps/cores/bookmarks/organizer/read/package.json ./apps/cores/bookmarks/organizer/read/

# Install all dependencies
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# Builder stage
FROM base AS builder
WORKDIR /app

# Copy node_modules from deps
COPY --from=deps /app/node_modules ./node_modules

# Copy source files
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY packages/ ./packages/
COPY tools/ ./tools/
COPY apps/cores/bookmarks/organizer/read/ ./apps/cores/bookmarks/organizer/read/

# Install dependencies for all workspaces (needed for internal packages)
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# Build the service
RUN pnpm --filter "@bookmarks-cores/organizer-read" build

# Fix ESM import paths (add .js extensions)
WORKDIR /app/apps/cores/bookmarks/organizer/read
RUN npx fix-esm-import-path dist

# Runner stage
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 appuser

# Copy built application with correct ownership
# Include tools/typescript for the tsconfig.json base
COPY --from=builder --chown=appuser:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=appuser:nodejs /app/packages/proto/node_modules ./packages/proto/node_modules
COPY --from=builder --chown=appuser:nodejs /app/packages/proto/gen ./packages/proto/gen
COPY --from=builder --chown=appuser:nodejs /app/packages/proto/package.json ./packages/proto/package.json
COPY --from=builder --chown=appuser:nodejs /app/tools/typescript ./tools/typescript
COPY --from=builder --chown=appuser:nodejs /app/apps/cores/bookmarks/organizer/read/node_modules ./apps/cores/bookmarks/organizer/read/node_modules
COPY --from=builder --chown=appuser:nodejs /app/apps/cores/bookmarks/organizer/read/dist ./apps/cores/bookmarks/organizer/read/dist
COPY --from=builder --chown=appuser:nodejs /app/apps/cores/bookmarks/organizer/read/tsconfig.json ./apps/cores/bookmarks/organizer/read/tsconfig.json
COPY --from=builder --chown=appuser:nodejs /app/apps/cores/bookmarks/organizer/read/package.json ./apps/cores/bookmarks/organizer/read/package.json

WORKDIR /app/apps/cores/bookmarks/organizer/read

USER appuser

EXPOSE 3000 50051

# Use tsx to handle TypeScript imports from @packages/proto
CMD ["npx", "tsx", "dist/main.js"]
