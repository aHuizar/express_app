# pull official base image
FROM node:15.7.0-alpine3.12

# set working directory
WORKDIR /usr/src/app

# Install python/pip
# Install python/pip
ENV PYTHONUNBUFFERED=1
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip
RUN pip3 install --no-cache --upgrade pip setuptools

# Install build essentials
RUN apk add --update alpine-sdk

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
COPY index.js ./
COPY foobar.db ./
RUN npm install --silent
#RUN npm install -g nodemon



RUN npm install -g node-gyp
RUN mkdir /usr/src/app/client && mkdir /usr/src/app/client/build

# add app
COPY ./client/build ./client/build
EXPOSE 8080
# start app
CMD ["node", "index.js"]