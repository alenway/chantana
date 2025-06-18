# Base image (Node.js + dependencies for Expo)
FROM node:18-bullseye

# Install Expo CLI and required system dependencies
RUN npm install -g expo-cli && \
    apt-get update && \
    apt-get install -y \
    openjdk-11-jdk \
    git \
    curl \
    && \
    rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files
COPY . .

# Set environment variables
ENV ADB_IP=host.docker.internal
ENV REACT_NATIVE_PACKAGER_HOSTNAME=host.docker.internal

# Start the Expo development server
CMD ["npx", "expo", "start"]
