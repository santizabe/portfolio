# We use the official Node version 20 based on Debian Bookworm (Slim version for size)
FROM debian:bookworm

# Create the working directory inside the container
WORKDIR /app

# 1. Copy package.json and lock file from the 'tools' directory first.
#    This allows Docker to cache the "npm install" step if these files haven't changed.
COPY tools/package*.json .

# 2. Install dependencies
#    (Using --omit=dev to avoid installing devDependencies like nodemon in production)
RUN npm install --omit=dev

# 3. Copy the rest of the source code from the 'tools' directory
COPY tools/* .

# 4. Expose the port Fastify is listening on
EXPOSE 3000

CMD ["node", "server.js"]