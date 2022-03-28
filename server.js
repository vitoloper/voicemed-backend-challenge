/**
 * @description Server
 * @module server
 */

'use strict';

/**
 * Load configuration
 * @const {object}
 */
const config = require('./config');

/**
 * Create server
 * @const {object}
 */
const server = require('./app')({ logger: config.app.enableLogging });

server.log.info(`Environment configuration: ${config.env}`);

// Start server
(async () => {
    try {
        // Listen for incoming requests
        server.log.info('Starting server...');
        await server.listen(config.app.port, config.app.host);
        server.swagger();
    } catch (err) {
        server.log.error(err)
        process.exit(1)
    }
})();