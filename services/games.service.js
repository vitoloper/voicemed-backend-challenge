/**
 * @description Games service
 * @module services/games
 */

'use strict';

// Module dependencies
const Game = require('../models/game.model');
const JobQueue = require('../helpers/bull.singleton.job.helper');

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

/**
 * @async
 * @function bestValueGames
 * @description Send a job to a worker and return a combination with the highest possible total value that fits given pen-drive space.
 * @param {number} penDriveSpace 
 * @returns {object[]} Array of games
 */
const bestValueGames = async (penDriveSpace) => {
    const jobQueue = new JobQueue().getInstance();

    /**
     * Add job to queue
     * @const {object}
     */
    const job = await jobQueue.add({ pen_drive_space: penDriveSpace });

    /**
     * Returns a promise that resolves or rejects when the job completes or fails
     * @const {Promise<object>}
     */
    const result = await job.finished();

    return result;
}

module.exports = {
    saveGame,
    bestValueGames
};