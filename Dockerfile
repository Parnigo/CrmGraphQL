# Use official Node LTS image
FROM node:20

# Set working directory inside container
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Expose the port (can be set via .env too)
EXPOSE 4000

# Start the server
CMD [ "npm", "start" ]