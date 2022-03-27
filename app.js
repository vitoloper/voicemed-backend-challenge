'use strict';

// Module dependencies
const fastify = require('fastify');

// Load configuration
const config = require('./config');

/**
 * @description Fastify instance builder
 * @param {object} opts - options
 * @returns {object} Fastify instance
 */
function buildFastify(opts = {}) {
    const app = fastify(opts);

    // Register custom fastify mongoose plugin
    app.register(require('./plugins/mongoose.plugin'), { dbconfig: config.db })
        .after(err => {
            if (err) {
                app.log.error(err);
                process.exit(1);
            }
        });

    // Register fastify-swagger plugin (OpenAPI documentation)
    app.register(require('fastify-swagger'), require('./swagger/swagger.config.js'));

    // Register routes
    app.register(require('./routes/v1/status.routes'), { prefix: '/api/v1' });
    app.register(require('./routes/v1/games.routes'), { prefix: '/api/v1' });

    return app;
}

module.exports = buildFastify;