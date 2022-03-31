/**
 * Games integration tests
 */

'use strict';

// Module dependencies
const expect = require('chai').expect;
const supertest = require('supertest');
const { spawn } = require('child_process');
const buildFastify = require('../app');
const Game = require('../models/game.model');

describe('Games Integration', function () {
    describe('POST /api/v1/games', function () {
        let fastify;

        const newGame = {
            name: 'Brainstorm',
            price: 50,
            space: 52428800
        }

        before(async function () {
            // Build a fastify instance
            fastify = buildFastify();
            // Wait for db connection and server listening
            await fastify.ready();
        });

        after(async function () {
            // Remove all documents in the collection
            await Game.deleteMany({});
            // Wait for server to close
            await fastify.close();
        });

        it('should save a new game in the database and return it in the response body with status code 200', async function () {
            // Perform a request and get the response
            const response = await supertest(fastify.server)
                .post('/api/v1/games')
                .set('Accept', 'application/json')
                .send(newGame);

            // Check response
            expect(response.headers['content-type']).to.match(/json/);
            expect(response.statusCode).to.equal(200);
            expect(response.body).to.deep.equal(newGame);

            // Check that game is in the database
            const gameFromDb = await Game.findOne({ name: 'Brainstorm' }).lean();
            expect(gameFromDb).to.include(newGame);
        });

        it('should return error with status code 500 if a game with the same name already exists', async function () {
            // Perform a request and get the response
            const response = await supertest(fastify.server)
                .post('/api/v1/games')
                .set('Accept', 'application/json')
                .send(newGame);

            // Check response
            expect(response.headers['content-type']).to.match(/json/);
            expect(response.statusCode).to.equal(500);
        });

        it('should return error with status code 400 if \'name\' field is not present in request body', async function () {
            const someGame = {
                price: 100,
                space: 83886080
            };

            // Perform a request and get the response
            const response = await supertest(fastify.server)
                .post('/api/v1/games')
                .set('Accept', 'application/json')
                .send(someGame);

            // Check response
            expect(response.headers['content-type']).to.match(/json/);
            expect(response.statusCode).to.equal(400);
        });

        it('should return error with status code 400 if \'price\' field is not present in request body', async function () {
            const someGame = {
                name: 'Some Game',
                space: 83886080
            };

            // Perform a request and get the response
            const response = await supertest(fastify.server)
                .post('/api/v1/games')
                .set('Accept', 'application/json')
                .send(someGame);

            // Check response
            expect(response.headers['content-type']).to.match(/json/);
            expect(response.statusCode).to.equal(400);
        });

        it('should return error with status code 400 if \'space\' field is not present in request body', async function () {
            const someGame = {
                name: 'Some Game',
                price: 100
            };

            // Perform a request and get the response
            const response = await supertest(fastify.server)
                .post('/api/v1/games')
                .set('Accept', 'application/json')
                .send(someGame);

            // Check response
            expect(response.headers['content-type']).to.match(/json/);
            expect(response.statusCode).to.equal(400);
        });

        it('should return error with status code 400 if \'name\' is an empty string', async function () {
            const someGame = {
                name: '',
                price: 100,
                space: 83886080
            };

            // Perform a request and get the response
            const response = await supertest(fastify.server)
                .post('/api/v1/games')
                .set('Accept', 'application/json')
                .send(someGame);

            // Check response
            expect(response.headers['content-type']).to.match(/json/);
            expect(response.statusCode).to.equal(400);
        });

        it('should return error with status code 400 if \'price\' is a negative number', async function () {
            const someGame = {
                name: 'Some Game',
                price: -1,
                space: 83886080
            };

            // Perform a request and get the response
            const response = await supertest(fastify.server)
                .post('/api/v1/games')
                .set('Accept', 'application/json')
                .send(someGame);

            // Check response
            expect(response.headers['content-type']).to.match(/json/);
            expect(response.statusCode).to.equal(400);
        });

        it('should return error with status code 400 if \'space\' zero or less than zero', async function () {
            const someGame = {
                name: 'Some Game',
                price: 100,
                space: 0
            };

            // Perform a request and get the response
            const response = await supertest(fastify.server)
                .post('/api/v1/games')
                .set('Accept', 'application/json')
                .send(someGame);

            // Check response
            expect(response.headers['content-type']).to.match(/json/);
            expect(response.statusCode).to.equal(400);
        });

        it('should return error with status code 400 if \'space\' is not an integer number', async function () {
            const someGame = {
                name: 'Some Game',
                price: 100,
                space: 1024.89
            };

            // Perform a request and get the response
            const response = await supertest(fastify.server)
                .post('/api/v1/games')
                .set('Accept', 'application/json')
                .send(someGame);

            // Check response
            expect(response.headers['content-type']).to.match(/json/);
            expect(response.statusCode).to.equal(400);
        });

        it('should return error with status code 400 if \'price\' is not a valid number', async function () {
            const someGame = {
                name: 20,
                price: 'one hundred but it\' a string',
                space: 83886080
            };

            // Perform a request and get the response
            const response = await supertest(fastify.server)
                .post('/api/v1/games')
                .set('Accept', 'application/json')
                .send(someGame);

            // Check response
            expect(response.headers['content-type']).to.match(/json/);
            expect(response.statusCode).to.equal(400);
        });

        it('should return error with status code 400 if \'space\' is not a valid number', async function () {
            const someGame = {
                name: 20,
                price: 100,
                space: 'a lot of space'
            };

            // Perform a request and get the response
            const response = await supertest(fastify.server)
                .post('/api/v1/games')
                .set('Accept', 'application/json')
                .send(someGame);

            // Check response
            expect(response.headers['content-type']).to.match(/json/);
            expect(response.statusCode).to.equal(400);
        });
    }); // describe('POST /api/v1/games' ...)

    describe('POST /api/v1/best_value_games', function () {
        let fastify;
        let worker;

        before(async function () {
            // Build a fastify instance
            fastify = buildFastify();

            // Wait for db connection and server listening
            await fastify.ready();

            // Insert test data in the database
            // Datasets P01
            // knapsack capacity: 165
            // https://people.sc.fsu.edu/~jburkardt/datasets/knapsack_01/knapsack_01.html
            const items = [
                { name: 'Game 1', price: 92, space: 23 },
                { name: 'Game 2', price: 57, space: 31 },
                { name: 'Game 3', price: 49, space: 29 },
                { name: 'Game 4', price: 68, space: 44 },
                { name: 'Game 5', price: 60, space: 53 },
                { name: 'Game 6', price: 43, space: 38 },
                { name: 'Game 7', price: 67, space: 63 },
                { name: 'Game 8', price: 84, space: 85 },
                { name: 'Game 9', price: 87, space: 89 },
                { name: 'Game 10', price: 72, space: 82 }
            ];

            await Game.insertMany(items);

            // Create worker process if not in a containerized environment
            if (process.env.RUNNING_IN_CONTAINER !== 'true') {
                worker = spawn('node', ['./worker/worker.js']);
            }
        });

        after(async function () {
            // Remove all documents in the collection
            await Game.deleteMany({});

            // Wait for server to close
            await fastify.close();

            // Terminate worker process if not in a containerized environment
            if (process.env.RUNNING_IN_CONTAINER !== 'true') {
                worker.kill('SIGTERM');
            }

        });

        it('should return the optimal selection of items', async function () {
            /** @const {number} */
            const penDriveSpace = 165;

            // Perform a request and get the response
            const response = await supertest(fastify.server)
                .post(`/api/v1/best_value_games?pen_drive_space=${penDriveSpace}`)
                .set('Accept', 'application/json')
                .send();

            /** @const {object} */
            const result = response.body;

            /** @const {object} */
            const games = result.games;

            // Expectations on games included
            expect(games.map(item => item.name)).to.include("Game 1");
            expect(games.map(item => item.name)).to.include("Game 2");
            expect(games.map(item => item.name)).to.include("Game 3");
            expect(games.map(item => item.name)).to.include("Game 4");
            expect(games.map(item => item.name)).to.not.include("Game 5");
            expect(games.map(item => item.name)).to.include("Game 6");
            expect(games.map(item => item.name)).to.not.include("Game 7");
            expect(games.map(item => item.name)).to.not.include("Game 8");
            expect(games.map(item => item.name)).to.not.include("Game 9");
            expect(games.map(item => item.name)).to.not.include("Game 10");

            // Expectations on total_space and remaining_space fields
            expect(result).to.have.a.property('total_space').to.equal(165);
            expect(result).to.have.a.property('remaining_space').to.equal(0);
        });

        it('should return error with status code 400 if \'pen_drive_space\' field is not present in query string', async function () {
            // Perform a request and get the response
            const response = await supertest(fastify.server)
                .post(`/api/v1/best_value_games?other_field=random_val`)
                .set('Accept', 'application/json')
                .send();

            // Check response
            expect(response.headers['content-type']).to.match(/json/);
            expect(response.statusCode).to.equal(400);
        });

        it('should return error with status code 400 if \'pen_drive_space\' field is not an integer', async function () {
            /** @const {number} */
            const penDriveSpace = 1000000.879;

            // Perform a request and get the response
            const response = await supertest(fastify.server)
                .post(`/api/v1/best_value_games?pen_drive_space=${penDriveSpace}`)
                .set('Accept', 'application/json')
                .send();

            // Check response
            expect(response.headers['content-type']).to.match(/json/);
            expect(response.statusCode).to.equal(400);
        });
    }); // describe('POST /api/v1/best_value_games', ...)
});