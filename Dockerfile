FROM node:16

RUN mkdir -p /home/app

COPY . /home/app

WORKDIR /home/app

RUN yarn

RUN yarn build
RUN yarn start

EXPOSE 5000
