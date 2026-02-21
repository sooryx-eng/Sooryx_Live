FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Build app
COPY . .
RUN npm run build

# Expose port
EXPOSE 3000

# Start
CMD ["npm", "start"]
