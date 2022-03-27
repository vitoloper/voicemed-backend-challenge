// Status routes

'use strict';

// Module dependencies
const statusController = require('../../controllers/status.controller');
const statusSchema = require('../../schemas/status.schema.v1');

/**
 * @description Routes definition function
 * @param {object} fastify - Fastify instance
 */
async function routes(fastify) {
    fastify.get('/status', { schema: statusSchema.getStatus }, statusController.getDbConnStatus);

    fastify.head('/status', { schema: statusSchema.headStatus }, statusController.getDbConnStatus);
}

module.exports = routes;