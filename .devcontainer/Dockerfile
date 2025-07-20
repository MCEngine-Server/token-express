# Base image with Node.js 18 from Microsoft's devcontainers
FROM mcr.microsoft.com/devcontainers/javascript-node:18

# Install unzip, Docker CLI, and Docker Compose CLI
RUN apt-get update && apt-get install -y \
    unzip \
    ca-certificates \
    curl \
    gnupg \
    lsb-release && \
    mkdir -p /etc/apt/keyrings && \
    curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg && \
    echo \
    "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
    https://download.docker.com/linux/debian $(lsb_release -cs) stable" \
    | tee /etc/apt/sources.list.d/docker.list > /dev/null && \
    apt-get update && apt-get install -y \
    docker-ce-cli \
    docker-compose-plugin && \
    apt-get clean && rm -rf /var/lib/apt/lists/*
