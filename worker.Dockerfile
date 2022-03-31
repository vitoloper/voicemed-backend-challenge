# Worker Dockerfile

FROM node:16.14.2-alpine
WORKDIR /worker
COPY . .
RUN npm install

CMD ["node", "worker/worker.js"]