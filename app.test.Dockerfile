# App (server) Dockerfile

FROM node:16.14.2-alpine
WORKDIR /app
COPY . .
RUN npm install

ENV NODE_ENV="test"
ENV TEST_DB_URI="mongodb://mongodb:27017/voicemed-challenge-test"
ENV TEST_REDIS_URI="redis://redis:6379/3"
# Some tests may spawn a worker process, but in a containerized environment
# worker processes have to be started by Docker, not by the tests themselves.
ENV RUNNING_IN_CONTAINER="true"

CMD ["npm", "test"]
EXPOSE 3000