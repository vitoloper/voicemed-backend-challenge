/**
 * @description Status routes schemas
 * @module schemas/v1/status
 */

'use strict';

const getStatus = {
    description: 'Get database connection status',
    tags: ['db'],
    response: {
        200: {
            description: 'Database connection is healthy',
            type: 'object',
            properties: {
                database: { type: 'string' }
            }
        },
        503: {
            description: 'Database connection is not healthy',
            type: 'object',
            properties: {
                database: { type: 'string' }
            }
        }
    }
};

const headStatus = {
    description: 'Get database connection status',
    tags: ['db'],
    response: {
        200: {
            description: 'Database connection is healthy',
            type: 'null'
        },
        503: {
            description: 'Database connection is not healthy',
            type: 'null'
        }
    }
};

module.exports = {
    getStatus,
    headStatus
};