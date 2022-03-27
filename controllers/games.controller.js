// Games controller

'use strict';

// Module dependencies
const gamesService = require('../services/games.service');

/**
 * @description Save a new game
 * @param {object} request - incoming request
 * @param {object} reply - server reply
 * @returns {object} Saved game
 */
const saveGame_v1 = async (request) => {
    let result = await gamesService.saveGame(request.body);
    return result;
}

module.exports = {
    saveGame_v1
};