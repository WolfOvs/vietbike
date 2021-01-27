# pull official base image
#FROM image-registry.openshift-image-registry.svc:5000/openshift/nodejs

FROM node:13.12.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./

RUN npm i -g npm

RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

EXPOSE 5000

# add app
COPY . ./

# start app
CMD ["npm", "start"]