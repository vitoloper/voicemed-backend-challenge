// Status controller

'use strict';

// Module dependencies
const statusService = require('../services/status.service');

/**
 * @description Get database connection status
 * @param {object} request - incoming request
 * @param {object} reply - server reply
 * @returns {object} Response body sent to client
 */
const getDbConnStatus = async (request, reply) => {

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
    getDbConnStatus
};