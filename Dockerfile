FROM node:18.19-alpine3.18

WORKDIR /backend

COPY package.json .

RUN npm install

COPY . .

RUN npx sequelize db:migrate

CMD [ "npm", "run", "start-production" ]