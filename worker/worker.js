/**
 * @description Queue worker (consumer)
 * @module
 */

'use strict';

// Module dependencies
const Queue = require('bull');
const path = require('path');

// Load configuration
const config = require('../config/app.config');

console.info(`Environment configuration: ${config.env}`);

/**
 * Job queue
 * @const {object}
 */
const jobQueue = new Queue(config.bull.jobQueueName, { redis: config.redis });

// Set 'error' event listener
jobQueue.on('error', (err) => {
    console.error(err);
});

// Set 'failed' event listener
jobQueue.on('failed', function (job, err) {
    console.error(`Job ${job.id} failed with reason ${err}`);
});

// Set 'active' event listener
jobQueue.on('active', function (job) {
    console.log(`Job ${job.id} has started`);
});

// Set 'completed' event listener
jobQueue.on('completed', function (job) {
    console.log(`Job ${job.id} has been completed`);
});

// Set 'stalled' event listener
jobQueue.on('stalled', function (job) {
    console.log(`Job ${job.id} has stalled`);
})

console.info('Waiting for incoming jobs');

// Use a separate processor to handle the incoming requests
jobQueue.process(path.resolve('./worker/knapsack-processor.js'));