// Status controller

'use strict';

// Module dependencies
const statusService = require('../services/status.service');

/**
 * @async
 * @function getDbConnStatus_v1
 * @description Get database connection status.
 * @param {object} request - incoming request
 * @param {object} reply - server reply
 * @returns {Promise<object>} Response body sent to client
 */
const getDbConnStatus_v1 = async (request, reply) => {

    let isConnHealthy = await statusService.getDbConnStatus();

    if (isConnHealthy) {
        return { database: 'healthy' };
    } else {
        // Set "503 Service Unavailable" status code
        reply.statusCode = 503;
        return { database: 'unhealthy' };
    }
}

module.exports = {
    getDbConnStatus_v1
};