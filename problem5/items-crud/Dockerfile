# Stage 1: build
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files, install dependencies
COPY package*.json ./
RUN npm install

# Optionally install Nest CLI globally (if you rely on it in build scripts)
RUN npm install -g @nestjs/cli

# Copy the rest of the code
COPY . .

# Build the NestJS app (generates /app/dist folder)
RUN npm run build

# Stage 2: run (production image)
FROM node:20-alpine

WORKDIR /app

# Copy only the necessary artifacts from the builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Expose port (if you run on 3000)
EXPOSE 3000

# Start the application
CMD ["node", "dist/main.js"]
