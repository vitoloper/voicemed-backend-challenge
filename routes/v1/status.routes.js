// Status routes

'use strict';

// Module dependencies
const statusController = require('../../controllers/status.controller');
const statusSchema_v1 = require('../../schemas/v1/status.schema');

/**
 * @description Routes definition function
 * @param {object} fastify - Fastify instance
 */
async function routes(fastify) {
    fastify.get('/status', { schema: statusSchema_v1.getStatus }, statusController.getDbConnStatus_v1);
    fastify.head('/status', { schema: statusSchema_v1.headStatus }, statusController.getDbConnStatus_v1);
}

module.exports = routes;