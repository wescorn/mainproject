# Use the official Node.js image as the base
FROM node:20

# Set the working directory inside the container
WORKDIR /products

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Specify the command to start the API
CMD ["npm", "start"]
