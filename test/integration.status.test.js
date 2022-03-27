'use strict';

// Module dependencies
const expect = require('chai').expect;
const supertest = require('supertest');
const buildFastify = require('../app');
const mongoose = require('mongoose');

describe('Status Integration', function () {
    describe('GET /api/v1/status', function () {
        let fastify;

        before(async function () {
            // Build a fastify instance
            fastify = buildFastify();
            // Wait for db connection and server listening
            await fastify.ready();
        });

        after(async function () {
            // Wait for server to close
            await fastify.close();
        });

        it('should return {"database": "healthy"} and status code 200 when db connection is healthy', async function () {
            const response = await supertest(fastify.server)
                .get('/api/v1/status')
                .expect(200);

            expect(response.body).to.have.a.property('database').to.equal('healthy');
        });

        it('should return {"database": "unhealthy"} and status code 503 when db connection is unhealthy', async function () {

            // Disconnect from database
            await mongoose.disconnect();

            const response = await supertest(fastify.server)
                .get('/api/v1/status')
                .expect(503);

            expect(response.body).to.have.a.property('database').to.equal('unhealthy');
        });
    });

    describe('HEAD /api/v1/status', function () {
        let fastify;

        before(async function () {
            // Build a fastify instance
            fastify = buildFastify();
            // Wait for db connection and server listening
            await fastify.ready();
        });

        after(async function () {
            // Wait for server to close
            await fastify.close();
        });

        it('should return status code 200 when db connection is healthy', async function () {
            const response = await supertest(fastify.server)
                .get('/api/v1/status')
                .expect(200);
        });

        it('should return status code 503 when db connection is unhealthy', async function () {

            // Disconnect from database
            await mongoose.disconnect();

            const response = await supertest(fastify.server)
                .get('/api/v1/status')
                .expect(503);
        });
    });
});