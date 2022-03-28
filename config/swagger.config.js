/**
 * @description Swagger configuration
 * @module config/swagger
 */

'use strict';

/**
 * @description Application version number
 * @const {string}
 */
const packageVersion = require('../package.json').version;

module.exports = {
    routePrefix: '/docs',
    openapi: {
        info: {
            title: 'Voicemed backend challenge API',
            description: 'API description for the backend recruitment task.',
            version: packageVersion
        },
        servers: [

        ],
        components: [

        ],
        tags: [
            { name: 'db', description: 'Database related end-points' },
            { name: 'game', description: 'Game related end-points' }
        ]
    },
    uiConfig: {
        docExpansion: 'full',
        deepLinking: false
    },
    uiHooks: {
        onRequest: function (request, reply, next) { next() },
        preHandler: function (request, reply, next) { next() }
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    exposeRoute: true
};