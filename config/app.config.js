/**
 * @description Environment-based application configuration file
 * @module config/app
 */

'use strict';

// Use dotenv to load environment variables from .env file
require('dotenv').config()

// Get the current environment
const env = process.env.NODE_ENV || 'development';

// Development environment configuration
const development = {
    env: env,
    app: {
        host: process.env.DEV_APP_HOST || '0.0.0.0',
        port: parseInt(process.env.DEV_APP_PORT) || 3000,
        enableLogging: true
    },
    db: {
        uri: process.env.DEV_DB_URI || 'mongodb://localhost:27017/voicemed-challenge-dev',
        options: {
            serverSelectionTimeoutMS: 5000 // Keep trying to send operations for 5 seconds
        }
    },
    redis: {
        host: '127.0.0.1',
        port: 6379
    },
    bull: {
        jobQueueName: 'job-queue-dev'
    }
};

// Production environment configuration
const production = {
    env: env,
    app: {
        host: process.env.PROD_APP_HOST || '0.0.0.0',
        port: parseInt(process.env.PROD_APP_PORT) || 3000,
        enableLogging: true
    },
    db: {
        uri: process.env.PROD_DB_URI || 'mongodb://localhost:27017/voicemed-challenge-prod',
        options: {
            serverSelectionTimeoutMS: 5000 // Keep trying to send operations for 5 seconds
        }
    },
    redis: {
        host: '127.0.0.1',
        port: 6379
    },
    bull: {
        jobQueueName: 'job-queue-prod'
    }
};

// Test environment configuration
const test = {
    env: env,
    app: {
        host: process.env.TEST_APP_HOST || '0.0.0.0',
        port: parseInt(process.env.TEST_APP_PORT) || 3001,
        enableLogging: false
    },
    db: {
        uri: process.env.TEST_DB_URI || 'mongodb://localhost:27017/voicemed-challenge-test',
        options: {
            serverSelectionTimeoutMS: 5000 // Keep trying to send operations for 5 seconds
        }
    },
    redis: {
        host: '127.0.0.1',
        port: 6379
    },
    bull: {
        jobQueueName: 'job-queue-test'
    }
};

// Configuration object
const config = {
    development,
    production,
    test
};

// Export one configuration only based on the current environment
module.exports = config[env];