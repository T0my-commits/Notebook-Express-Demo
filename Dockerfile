FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY src ./

EXPOSE 3000

CMD ["node", "server.js"]

