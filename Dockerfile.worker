# Worker Dockerfile

FROM node:16.14.2-alpine
WORKDIR /worker
COPY . .
RUN npm install
ENV NODE_ENV="production"
ENV PROD_DB_URI="mongodb://mongodb:27017/voicemed-challenge-prod"
ENV PROD_REDIS_URI="redis://redis:6379/2"
CMD ["node", "worker/worker.js"]