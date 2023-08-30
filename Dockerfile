# Use the official Node.js image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install backend dependencies
RUN npm install

# Copy the rest of the backend files
COPY . .

# Expose port 3000 (the port your backend app listens on)
EXPOSE 3000

# Start the backend server
CMD ["node", "server.js"]
