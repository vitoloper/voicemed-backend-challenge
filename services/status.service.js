// Status service

'use strict';

// Module dependencies
const helpers = require('../helpers/status.helpers.js');

/**
 * @description Get database connection status
 * @returns {boolean} Connection is healthy or not
 */
const getDbConnStatus = async () => {
    if (helpers.getMongooseConnReadyState() === 1) {
        return true;
    } else {
        return false;
    }
}

module.exports = {
    getDbConnStatus
};