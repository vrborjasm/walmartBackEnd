FROM node:14-alpine3.14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install nodemon@^2.0.7 -g --silent

CMD [ "nodemon", "src/index.js" ]
