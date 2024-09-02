FROM node:latest

WORKDIR /web/

COPY ./package*.json /web/

RUN npm install

CMD ["npm", "run", "dev"]