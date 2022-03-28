// Status helper functions
/**
 * @description Status helper
 * @module helpers/status
 */

'use strict';

// Module dependencies
const mongoose = require('mongoose');

/**
 * @function getMongooseConnReadyState
 * @description Wrapper function which returns mongoose.connection.readyState.
 * @returns {number} mongoose connection state
 */
const getMongooseConnReadyState = () => {
    return mongoose.connection.readyState;
}

module.exports = {
    getMongooseConnReadyState
};