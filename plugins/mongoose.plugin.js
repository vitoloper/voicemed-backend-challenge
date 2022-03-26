'use strict';

const mongoose = require('mongoose');

/**
 * @description Mongoose setup plugin
 * @param {object} fastify - fastify instance
 * @param {object} options - options
 * @param {function} done - function called when plugin is ready
 */
module.exports = async function (fastify, options, done) {
    // Set mongoose connection 'connected' event listener
    mongoose.connection.on('connected', () => {
        fastify.log.info(`Connected to database at ${options.dbconfig.uri}`);
    });

    // Connect to the database
    await mongoose.connect(options.dbconfig.uri, options.dbconfig.options);

    // Set mongoose connection 'error' event listener
    mongoose.connection.on('error', (mongoError) => {
        fastify.log.error(mongoError);
    });

    // Set mongoose connection 'disconnected' event listener
    mongoose.connection.on('disconnected', () => {
        fastify.log.error(`Disconnected from database at ${options.dbconfig.uri}`);
    });

    done();
};