'use strict';

// Load configuration
const config = require('./config');

// Load mongoose dependency
const mongoose = require('mongoose');

// Create a fastify instance
const fastify = require('fastify')({ logger: config.app.enableLogging });

fastify.log.info(`Environment configuration: ${config.env}`);

// Register routes
fastify.register(require('./routes/status.routes'));

// Setup db connection and start server
(async () => {
    try {
        // Set mongoose connection 'connected' event listener
        mongoose.connection.on('connected', () => {
            fastify.log.info(`Connected to database at ${config.db.uri}`);
        });

        // Connect to the database
        await mongoose.connect(config.db.uri, config.db.options);

        // Set mongoose connection 'error' event listener
        mongoose.connection.on('error', (mongoError) => {
            fastify.log.error(mongoError);
        });

        // Set mongoose connection 'disconnected' event listener
        mongoose.connection.on('disconnected', () => {
            fastify.log.error(`Disconnected from database at ${config.db.uri}`);
        });

        // Listen for incoming requests
        fastify.log.info('Starting server...');
        await fastify.listen(config.app.port, config.app.host);
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
})();