/**
 * @description Games controller
 * @module controllers/games
 */

'use strict';

// Module dependencies
const gamesService = require('../services/games.service');

/**
 * @async
 * @function saveGame_v1
 * @description Save a new game.
 * @param {object} request - incoming request
 * @param {object} reply - server reply
 * @returns {Promise<object>} Saved game
 */
const saveGame_v1 = async (request) => {
    /** @const {object} */
    const result = await gamesService.saveGame(request.body);
    return result;
}

/**
 * @async
 * @function bestValueGames_v1
 * @description Return a combination of games with the highest possible total value that fits given pen-drive space.
 * @param {object} request - incoming request
 * @param {object} reply - server reply
 * @returns {Promise<object>} Combination of games
 */
const bestValueGames_v1 = async (request) => {
    /** @const {object} */
    const result = await gamesService.bestValueGames(request.query.pen_drive_space);
    return result;
}

module.exports = {
    saveGame_v1,
    bestValueGames_v1
};