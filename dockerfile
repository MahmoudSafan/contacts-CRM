# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src/migrations ./dist/src/migrations

# Install wait-for tool and postgres client
RUN apk add --no-cache postgresql-client

EXPOSE 3000
CMD ["sh", "-c", "until pg_isready -h db -p 5432; do sleep 1; done && npm run migrate:prod && npm start"]