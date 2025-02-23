FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json .

RUN yarn install

COPY . .

RUN yarn run build

# Step 2: Server With Nginx
FROM nginx:1.23-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf *
COPY --from=build /app/dist .
EXPOSE 80
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]