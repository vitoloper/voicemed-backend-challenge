/**
 * @description Knapsack 0/1 problem processor
 * @module worker/knapsack-processor
 */

'use strict';

// Module dependencies
const mongoose = require('mongoose');
const Game = require('../models/game.model');
const BestValueResult = require('../models/best-value-result.model');
const { computeKnapsackTable, getBestItems } = require('./knapsack-utils');

// Configuration
const config = require('../config/app.config');

/**
 * Set mongoose listeners outside of the exported function,
 * otherwise multiple listeners for the same event will be registered.
 */

// Set mongoose connection 'connected' event listener
mongoose.connection.on('connected', () => {
    console.info(`Connected to database at ${config.db.uri}`);
});

// Set mongoose connection 'error' event listener
mongoose.connection.on('error', (mongoError) => {
    console.error(mongoError);
    throw mongoError;
});

// Set mongoose connection 'disconnected' event listener
mongoose.connection.on('disconnected', () => {
    console.info(`Disconnected from database at ${config.db.uri}`);
});

/**
 * @async
 * @function
 * @description Bull queue job processor
 * @param {object} job - the job to process 
 * @returns {object} Result data
 */
module.exports = async (job) => {
    // TODO: sanity checks on the job data
    if (!job.data || !job.data.pen_drive_space) {
        throw new Error('pen_drive_space field missing in job data');
    }

    if (!Number.isInteger(job.data.pen_drive_space)) {
        throw new Error('pen_drive_space should be an integer value');
    }

    /**
     * Maximum pen drive space (maximum "knapsack" weight)
     * @const {number}
     */
    const W = parseInt(job.data.pen_drive_space);

    // Connect to database
    await mongoose.connect(config.db.uri, config.db.options);

    // Read all games
    const items = await Game.find().lean();

    // Use scaled integers: convert price in cents
    for (let i = 0; i < items.length; i++) {
        items[i].price = Math.round(items[i].price * 100);
    }

    /**
     * Compute knapsack table containing prices for different combinations of games
     * @const {number[][]}
     */
    const pricesTable = computeKnapsackTable(items, W);

    /**
     * Get an array with the best games combination
     * @const {object[]}
     */
    const bestItems = getBestItems(pricesTable, items, W);

    /** 
     * Total space of selected games
     * @const {number}  
     */
    const totalSpace = bestItems.reduce((total, item) => { return total + item.space }, 0);

    /**
     * Remaining space on the pen-drive after download 
     * @const {number}
     * */
    const remainingSpace = W - totalSpace;

    // Restore float prices
    for (let i = 0; i < bestItems.length; i++) {
        bestItems[i].price = bestItems[i].price / 100;
    }

    // Create a new document
    const bestValueResult = new BestValueResult({
        games: bestItems,
        total_space: totalSpace,
        remaining_space: remainingSpace
    });

    // Write results on database
    const saveResult = await bestValueResult.save();

    // Close connection to database
    await mongoose.disconnect();

    /**
     * @const {object}
     */
    const result = { id: saveResult._id.toString() };
    console.log(`Job finished, result saved with object id ${saveResult._id.toString()}`);

    return result;
};