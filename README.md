# voicemed-backend-challenge
Voicemed backend challenge solution based on Node.js, MongoDB and Redis.

## Running using Docker
There are three default Docker Compose files, each one describing a specific configuration:
- docker-compose.dev.yml: development configuration
- docker-compose.prod.yml: production configuration
- docker-compose.test.yml: test configuration

Each Compose file can be customized as needed (e.g. by adding a volume or by using a different network). Application specific environment variables can also be changed.

Use the following command to start the application and the related services, where *config* can be either "dev" or "prod":

```sh
$ docker-compose -f docker-compose.<config>.yml up -d
```

Use the following command to stop the application containers and the service containers:
```sh
$ docker-compose -f docker-compose.<config>.yml down -d
```

By default, the main app container exposes port 3000/tcp.

## Running unit and integration tests using Docker
Use the following command to run tests using Docker:

```sh
$ docker-compose -f docker-compose.<config>.yml up -d
```

It is possible to inspect results using the `docker logs` command:

```sh
$ docker container logs voicemed-backend-challenge_app_test_1
```

## Running (without Docker)
Make sure to have Node.js installed, plus MongoDB and Redis up and running. This application was developed using the following software versions:
- Node.js 16.14.2
- MongoDB 5.0.6
- Redis 6.2.6


Clone the repository and install the required modules:

```sh
$ git clone https://github.com/vitoloper/voicemed-backend-challenge.git voicemed-backend-challenge
$ cd voicemed-backend-challenge
$ npm install
```
The file configuration file `config/app.config.js` contains different configurations based on the specific environment. Different options can be also passed using environment variables (e.g. application host or port).

Use the following command to start the application in development mode (which is the default mode if no NODE_ENV env variable is set) using `nodemon`:
```sh
$ npm run nodemon
```

To run the application using the production configuration file, use:

```sh
$ NODE_ENV=production npm start
```

## Running unit and integration tests (without Docker)
Use the following command to run tests (make sure both MongoDB and Redis are up and running):

```sh
$ npm test
```

It is also possible to execute unit tests only or integration tests only using the `npm run unittest` command or the `npm run inttest` command respectively.

Code coverage can be checked using the Istanbul code coverage tool:

```sh
npm run coverage
```

## API endpoints documentation
OpenAPI (Swagger) documentation is available at the */docs* endpoint.

## License
MIT