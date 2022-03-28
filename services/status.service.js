/**
 * @description Status service
 * @module services/status
 */

'use strict';

// Module dependencies
const helpers = require('../helpers/status.helpers.js');

/**
 * @async
 * @function getDbConnStatus
 * @description Get database connection status
 * @returns {Promise<boolean>} Connection is healthy or not
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