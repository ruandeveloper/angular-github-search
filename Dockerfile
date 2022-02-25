FROM node:lts-alpine as angular
WORKDIR /app
COPY package.json /app
RUN npm install --silent
COPY . .
RUN npm run build-prod

FROM nginx:alpine
VOLUME /var/cache/nginx
COPY --from=angular app/dist/angular-github-search /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf

# docker build -t angular-github-search .
# docker run -p 8081:80 angular-github-search
