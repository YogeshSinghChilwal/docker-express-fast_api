# Use official Node.js LTS image
FROM node:20

# Set working directory
WORKDIR /index

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy application files
COPY . .

# Expose the port your Node app runs on
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
