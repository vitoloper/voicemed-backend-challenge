/**
 * @description Bull singleton (job queue).
 * @module helpers/bull.singleton.job
 */

'use strict';

// Module dependencies
const Queue = require('bull');

/**
 * @class
 * @classdesc Bull singleton class.
 */
class BullSingletonJob {
    /**
     * @constructor
     * @description Bull singleton class constructor.
     * @param {string} queueName - Queue name
     * @param {object} options - Bull queue options
     */
    constructor(queueName, options) {
        if (!BullSingletonJob.instance) {
            BullSingletonJob.instance = new Queue(queueName, options);
        }
    }

    /**
     * @method
     * @description Return a Bull instance.
     * @returns {object} Bull instance
     */
    getInstance() {
        return BullSingletonJob.instance;
    }
}

module.exports = BullSingletonJob;