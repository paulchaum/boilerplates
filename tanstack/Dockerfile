# .---------------------------------.
# | Dockerfile for PRODUCTION build |
# '---------------------------------'

# Multi-stage build for production
FROM node:22-alpine AS base

# Install pnpm
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
FROM base AS deps
RUN pnpm install --frozen-lockfile

# Build stage
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the application
RUN pnpm build

# Production stage
FROM node:22-alpine AS runner
WORKDIR /app

# Install pnpm for running drizzle migrations
RUN npm install -g pnpm

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 appuser

# Copy package files for production dependencies
COPY package.json pnpm-lock.yaml ./

# Install production dependencies only
RUN pnpm install --frozen-lockfile --prod

# Copy drizzle config and migrations (needed for db:migrate)
COPY --from=builder --chown=appuser:nodejs /app/drizzle.config.ts ./
COPY --from=builder --chown=appuser:nodejs /app/drizzle/ ./drizzle/

# Copy database schema (needed for drizzle-kit migrate)
COPY --from=builder --chown=appuser:nodejs /app/src/db ./src/db

# Copy built application (includes public assets)
COPY --from=builder --chown=appuser:nodejs /app/.output ./.output

# Copy tsconfig for drizzle-kit to work properly
COPY --from=builder --chown=appuser:nodejs /app/tsconfig.json ./tsconfig.json

# Switch to non-root user
USER appuser

# Expose port
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Health check - basic HTTP check on the root endpoint
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/', (res) => { process.exit(res.statusCode < 500 ? 0 : 1) }).on('error', () => process.exit(1))" || exit 1

# Start the application
CMD ["sh", "-c", "pnpm db:migrate && node .output/server/index.mjs"]
