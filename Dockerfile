# Use an official Node.js runtime as the base image
FROM node:20-alpine

# Set the working directory within the container
WORKDIR /app

# Copy package.json and yarn.lock to the container
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code to the container
COPY . .

# Build the React app
RUN yarn build


# Command to run the app
# CMD ["yarn", "dev"]
