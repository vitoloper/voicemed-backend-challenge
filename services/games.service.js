// Games service

'use strict';

// Module dependencies
const Game = require('../models/game.model');

/**
 * @description Save a new game in the database
 * @param {object} game - game to save
 * @returns {object} Saved game
 */
const saveGame = async (game) => {
    // Ensure index building has been completed
    // See https://mongoosejs.com/docs/faq.html#unique-doesnt-work
    await Game.init();

    // Create a new game using model
    const newGame = new Game(game);

    // Save game in the database
    // const savedGame = await newGame.save();
    const savedGame = await newGame.save();

    return savedGame;
}

module.exports = {
    saveGame
};