#### STAGE 1: Build ###
## We label our stage as 'builder'
FROM node:8.6-alpine as builder

ENV APP_PATH /app

COPY package.json .
COPY package-lock.json .

### Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm install && npm install gulp --global && mkdir $APP_PATH && cp -R ./node_modules .$APP_PATH

WORKDIR $APP_PATH

COPY . .

### Build the angular app in production mode and store the artifacts in dist folder
RUN npm uninstall node-sass --save && npm install node-sass --save && npm run build-i18n && npm run gulp compress

#### STAGE 2: Setup ###
FROM nginx:1.13.3-alpine

ENV APP_PATH /app

### Copy our default nginx config
RUN rm -rf /etc/nginx/conf.d/*
COPY nginx/default.conf /etc/nginx/conf.d/

### Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

EXPOSE 80

### From 'builder' stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder $APP_PATH/dist/ /usr/share/nginx/html/

CMD ["nginx", "-g", "daemon off;"]