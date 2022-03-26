'use strict';

// Load configuration
const config = require('./config');

// Mongoose
const mongoose = require('mongoose');

// Create a fastify instance
const fastify = require('fastify')({ logger: config.app.enableLogging });

fastify.log.info(`Environment configuration: ${config.env}`);

// TODO: register routes here

// Setup db connection and start server
(async () => {
    try {
        const dbUrl = `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`;

        // Set mongoose connection 'connected' event listener
        mongoose.connection.on('connected', () => {
            fastify.log.info(`Connected to database at ${dbUrl}`);
        });

        // Connect to the database
        await mongoose.connect(dbUrl, config.db.options);

        // Set mongoose connection 'error' event listener
        mongoose.connection.on('error', (mongoError) => {
            fastify.log.error(mongoError);
        });

        // Set mongoose connection 'disconnected' event listener
        mongoose.connection.on('disconnected', () => {
            fastify.log.error(`Disconnected from database at ${dbUrl}`);
        });

        // Listen for incoming requests
        fastify.log.info('Starting server...');
        await fastify.listen(config.app.port, config.app.host);
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
})();