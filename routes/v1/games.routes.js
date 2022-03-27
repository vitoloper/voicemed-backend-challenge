// Games routes

'use strict';

// Module dependencies
const gamesController = require('../../controllers/games.controller');
const gamesSchema_v1 = require('../../schemas/v1/games.schema');

/**
 * @description Routes definition function
 * @param {object} fastify - Fastify instance
 */
async function routes(fastify) {
    fastify.post('/games', { schema: gamesSchema_v1.postGames }, gamesController.saveGame_v1);
}

module.exports = routes;