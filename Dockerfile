FROM node:latest

WORKDIR /web/

COPY ./package*.json /web/

RUN npm install

ENV DOCKER=true

CMD ["npm", "run", "dev"]