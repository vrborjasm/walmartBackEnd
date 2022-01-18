FROM node:14-alpine3.14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install nodemon@^2.0.7 -g
RUN npm install

COPY . .

CMD [ "nodemon", "src/index.js" ]

