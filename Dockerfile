FROM node:18.19-alpine3.18

WORKDIR /backend

COPY package.json .

RUN npm install

COPY . .

CMD [ "node", "server.js" ]