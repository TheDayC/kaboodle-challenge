# Begin with an initial Node builder stage.
FROM node:22.13.1-alpine AS builder

# Set the current working directory and copy all fies from the dev dir to ./app.
WORKDIR /app
COPY package.json package-lock.json ./

# Install dependencies and build the application.
RUN npm install
COPY . .
RUN npm run build

# Move to a second stage and install nginx as a web server.
FROM nginx:alpine

# Remove the default nginx assets.
RUN rm -rf /usr/share/nginx/html/*

# Copy static assets and template from builder stage.
COPY --from=builder /app/dist /usr/share/nginx/html
COPY /nginx/default.conf.template /etc/nginx/conf.d/default.conf

# Expose our chosen port to the internet and perform a health check.
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=30s \
    CMD wget http://localhost:8080 --spider || exit 1

# Initiate entry point for the container and don't self daemonize to avoid halting the container.
ENTRYPOINT ["nginx", "-g", "daemon off;"]