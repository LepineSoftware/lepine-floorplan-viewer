# Stage 1: Build the static assets
FROM node:22-alpine AS build
WORKDIR /app

# Copy dependency files first for better caching
COPY package*.json ./
RUN npm install

# Copy source code and build
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:stable-alpine
# Vite defaults its build output to the 'dist' folder
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 for the VPS
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]