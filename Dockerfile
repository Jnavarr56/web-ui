# base image
FROM node:latest

# set working directory
WORKDIR /app/web-ui

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/web-ui/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/web-ui/package.json
RUN npm install

# wait for users-api then start up
CMD ["/app/wait-for-it.sh", "users-api:3000", "--", "npm", "run", "start"]
