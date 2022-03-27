'use strict';

// Load configuration
const config = require('./config');

// Create a fastify instance
const fastify = require('fastify')({ logger: config.app.enableLogging });

fastify.log.info(`Environment configuration: ${config.env}`);

// Register custom mongoose plugin
fastify.register(require('./plugins/mongoose.plugin'), { dbconfig: config.db })
    .after(err => {
        if (err) {
            fastify.log.error(err);
            process.exit(1);
        }
    });

// Register fastify-swagger (OpenAPI documentation)
fastify.register(require('fastify-swagger'), require('./swagger/swagger.config.js'));

// Register routes
fastify.register(require('./routes/status.routes'));

// Start server
(async () => {
    try {
        // Listen for incoming requests
        fastify.log.info('Starting server...');
        await fastify.listen(config.app.port, config.app.host);
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
})();

// Export fastify instance for testing purposes
module.exports = fastify;