FROM node:22-alpine AS build-stage

WORKDIR /code

COPY ./package.json ./package-lock.json /code/
RUN npm ci
COPY src /code/src/
COPY dist /code/dist/
COPY ./tsconfig.json ./tailwind.config.js /code/
RUN npm run build

FROM nginx:latest

COPY --from=build-stage /code/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
