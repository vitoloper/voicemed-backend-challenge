// Status helper functions

'use strict';

// Module dependencies
const mongoose = require('mongoose');

/**
 * @description Wrapper function which returns mongoose.connection.readyState
 * @returns {number} mongoose connection state
 */
const getMongooseConnReadyState = () => {
    return mongoose.connection.readyState;
}

module.exports = {
    getMongooseConnReadyState
};