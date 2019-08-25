# base image
FROM node:12.8.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package*.json /app
RUN npm install --silent
COPY . /app

EXPOSE 3000

# start app
CMD ["npm", "run", "client"]
