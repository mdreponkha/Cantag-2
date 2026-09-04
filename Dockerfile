# Multi-stage Dockerfile for Canstar Power Tech
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package manifests
COPY package*.json ./
RUN npm ci

# Copy source code and build
COPY . .
RUN npm run build

# Production image
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy package manifests and production dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy built application and database assets
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/data ./data
COPY --from=builder /app/public ./public

# Expose server port
EXPOSE 3000

# Start server
CMD ["node", "dist/server.cjs"]
