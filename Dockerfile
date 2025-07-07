# Multi-stage build for production
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine AS production

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init curl

# Create app user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S zeropoint -u 1001

# Set working directory
WORKDIR /app

# Copy built application from builder stage
COPY --from=builder --chown=zeropoint:nodejs /app/dist ./dist
COPY --from=builder --chown=zeropoint:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=zeropoint:nodejs /app/package*.json ./

# Create necessary directories
RUN mkdir -p /app/logs /app/data && chown -R zeropoint:nodejs /app

# Switch to non-root user
USER zeropoint

# Expose ports
EXPOSE 8080 3001

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:3001/health || exit 1

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start the application
CMD ["node", "dist/index.js"] 