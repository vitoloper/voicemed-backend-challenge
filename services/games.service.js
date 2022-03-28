// Games service

'use strict';

// Module dependencies
const Game = require('../models/game.model');

/**
 * @async
 * @function savedGame
 * @description Save a new game in the database
 * @param {object} game - game to save
 * @returns {Promise<object>} Saved game
 */
const saveGame = async (game) => {
    // Ensure index building has been completed
    // See https://mongoosejs.com/docs/faq.html#unique-doesnt-work
    await Game.init();

    /** @const {object} */
    const newGame = new Game(game);

    /** @const {object} */
    const savedGame = await newGame.save();

    return savedGame;
}

module.exports = {
    saveGame
};