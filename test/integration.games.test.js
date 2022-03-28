'use strict';

// Module dependencies
const expect = require('chai').expect;
const supertest = require('supertest');
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

        it('should return with status code 500 if a game with the same name already exists', async function () {
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
    });
});