# Dockerfile

# Stage 1: Build Angular application
FROM node AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve Angular application using nginx
FROM nginx:alpine
COPY --from=builder /app/dist/macje-storitve/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]