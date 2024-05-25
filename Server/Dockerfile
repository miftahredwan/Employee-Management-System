# Use the official Node.js image.
FROM node:14 

# Create and change to the app directory.
WORKDIR /app

# Install app dependencies.
# COPY package*.json ./
COPY . /app
RUN npm install

# Copy app files.
# COPY . .

# Expose the port the app runs on.
EXPOSE 3000
 
# ENV NAME Server
# Run the app.
CMD node index.js
