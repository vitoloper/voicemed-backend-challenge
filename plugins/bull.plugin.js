/**
 * @description Bull queue initialization plugin
 * @module plugins/bull
 */

const JobQueue = require('../helpers/bull.singleton.job.helper');

'use strict';

/**
 * @async
 * @function
 * @description Setup Bull queue (backed by Redis).
 * @param {object} fastify - fastify instance
 * @param {object} options - options
 * @param {function} done - function called when plugin is ready
 */
module.exports = async function (fastify, options, done) {
    const jobQueue = new JobQueue(options.bull.jobQueueName, { redis: options.redis }).getInstance();

    // Set 'error' event listener
    jobQueue.on('error', (err) => {
        fastify.log.error(err);
    });

    done();
};