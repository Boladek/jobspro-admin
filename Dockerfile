FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn run build

# Use a lightweight production image
FROM nginx:alpine

# Copy the built React app from the previous stage to the Nginx public directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom nginx.conf to the container
# when using the official Nginx images
# the default location of the configuration file is /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 8081
EXPOSE 8080

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]