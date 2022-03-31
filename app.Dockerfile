# App (server) Dockerfile

FROM node:16.14.2-alpine
WORKDIR /app
COPY . .
RUN npm install

CMD ["node", "server.js"]
EXPOSE 3000

