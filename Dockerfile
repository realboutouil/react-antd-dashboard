FROM node:lts-alpine as react-builder

WORKDIR /app

COPY package.json ./

RUN yarn

COPY . ./

RUN yarn build

FROM node:lts-alpine

# Maintainer info
LABEL maintainer="Mohammed Amine BOUTOUIL <boutouilmohammedamine@gmail.com>"

WORKDIR /app

RUN yarn init -y
RUN yarn add express express-static-gzip

COPY server.js ./
COPY --from=react-builder /app/build ./build

CMD ["node","server.js"]