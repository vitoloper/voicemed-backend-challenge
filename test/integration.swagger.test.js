'use strict';

// Module dependencies
const expect = require('chai').expect;
const supertest = require('supertest');
const buildFastify = require('../app');

describe('Swagger Integration', function () {
    // Build a fastify instance
    const fastify = buildFastify();

    before(async function () {
        // Wait for db connection and server listening
        await fastify.ready();
    });

    after(async function () {
        // Wait for server to close
        await fastify.close();
    });

    describe('GET /docs', function () {
        it('should return status code 302', async function () {
            const response = await supertest(fastify.server)
                .get('/docs')
                .expect(302);
        });
    });
});