FROM node:alpine

RUN apk add --no-cache tzdata

# Commands will run in this directory
WORKDIR /app

# Install app dependencies
COPY package.json /app
RUN npm install

# Add all our code inside that directory that lives in the container
ADD . /app

# ARG NODE_ENV=production
# ENV NODE_ENV=$NODE_ENV
# Set environment variables
ENV NODE_ENV production

# Generate production files
# RUN npm build

# The command to run our app when the container is run
CMD ["npm", "start"]
