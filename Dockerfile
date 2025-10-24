# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build application
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (vite and other deps are imported by bundled code)
RUN npm ci

# Copy built frontend from builder stage
COPY --from=builder /app/dist ./dist

# Copy source files for server
COPY --from=builder /app/server ./server
COPY --from=builder /app/shared ./shared
COPY --from=builder /app/drizzle.config.ts ./
COPY --from=builder /app/vite.config.ts ./
COPY --from=builder /app/tsconfig.json ./

# Expose port
EXPOSE 5000

# Set environment to production
ENV NODE_ENV=production

# Start application with tsx
CMD ["npm", "start"]
