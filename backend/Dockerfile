# deployment via ChatGPT
# Use the official Node.js runtime as a parent image
FROM node:19-bullseye

# Set the working directory to /app
WORKDIR /

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose port 8080
EXPOSE 8080

# Start the application
CMD ["node", "./src/app.mjs"]