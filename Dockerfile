# --- 1. Build Stage ---
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies separately to optimize caching
COPY package*.json ./
RUN npm ci

# Copy the rest of the code
COPY . .

# Generate Prisma client (adjust if your schema is in another folder)
RUN npx prisma generate

# Build the NestJS app
RUN npm run build

# --- 2. Production Stage ---
FROM node:20-alpine AS prod

WORKDIR /app

# Only copy package.json and built files, NOT node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# If you use Prisma migrations at runtime (optional)
# COPY --from=builder /app/prisma ./prisma

ENV NODE_ENV=production

# Start the app
CMD ["node", "dist/main"]

# Expose the port (change if you use a different port)
EXPOSE 4000
