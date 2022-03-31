# Worker Dockerfile

FROM node:16.14.2-alpine
WORKDIR /worker
COPY . .
RUN npm install

ENV NODE_ENV="test"
ENV TEST_DB_URI="mongodb://mongodb:27017/voicemed-challenge-test"
ENV TEST_REDIS_URI="redis://redis:6379/3"

CMD ["node", "worker/worker.js"]