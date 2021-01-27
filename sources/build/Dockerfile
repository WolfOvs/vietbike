#FROM nginx:1.12-alpine
#COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
#EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]

# pull official base image
FROM node:latest

# add app
COPY . ./app

# set working directory
WORKDIR /app
