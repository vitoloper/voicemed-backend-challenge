// Status routes

'use strict';

// Module dependencies
const statusController = require('../controllers/status.controller');

/**
 * @description Routes definition function
 * @param {object} fastify - Fastify instance
 */
async function routes(fastify) {
    fastify.get('/status', statusController.getDbConnStatus);

    fastify.head('/status', statusController.getDbConnStatus);
}

module.exports = routes;