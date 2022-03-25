// Environment configuration file

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
        host: process.env.DEV_DB_HOST || 'localhost',
        port: parseInt(process.env.DEV_DB_PORT) || 27017,
        name: process.env.DEV_DB_NAME || 'voicemed-challenge-dev',
        options: {}
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
        host: process.env.PROD_DB_HOST || 'localhost',
        port: parseInt(process.env.PROD_DB_PORT) || 27017,
        name: process.env.PROD_DB_NAME || 'voicemed-challenge-prod',
        options: {}
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
        host: process.env.TEST_DB_HOST || 'localhost',
        port: parseInt(process.env.TEST_DB_PORT) || 27017,
        name: process.env.TEST_DB_NAME || 'voicemed-challenge-test',
        options: {}
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