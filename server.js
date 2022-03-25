'use strict';

// TODO: load configuration from js file

const mongoose = require('mongoose');

// Create a fastify instance with JSON logger enabled
const fastify = require('fastify')({ logger: { level: 'info' } });

// TODO: register routes here

// Setup db connection and start server
(async () => {
    try {
        await mongoose.connect(`mongodb://localhost:27017/test_database`);

        // TODO: listen for mongoose events

        fastify.log.info('Starting server...');
        await fastify.listen(3000, '0.0.0.0');
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
})();