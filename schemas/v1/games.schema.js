/**
 * @description Game routes schemas
 * @module schemas/v1/games
 */

'use strict';

/**
 * POST /api/v1/games schema
 * @const {object}
 */
const postGames = {
    description: 'Save a new game',
    tags: ['game'],
    body: {
        type: 'object',
        required: ['name', 'price', 'space'],
        properties: {
            name: { type: 'string', minLength: 1 },
            price: { type: 'number', minimum: 0 },
            space: { type: 'integer', minimum: 1 }
        }
    },
    response: {
        200: {
            description: 'Game successfully saved',
            type: 'object',
            properties: {
                name: { type: 'string' },
                price: { type: 'number' },
                space: { type: 'integer' }
            }
        }
    }
};

/**
 * POST /api/v1/best_value_games schema
 * @const {object}
 */
const postBestValueGames = {
    description: 'Return a combination with the highest possible total value that fits given pen-drive space',
    tags: ['game'],
    querystring: {
        type: 'object',
        required: ['pen_drive_space'],
        properties: {
            pen_drive_space: { type: 'integer', minimum: 1 }
        }
    },
    response: {
        200: {
            description: 'Success',
            type: 'object',
            properties: {
                games: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            name: { type: 'string' },
                            price: { type: 'number' },
                            space: { type: 'integer' }
                        }
                    }
                },
                total_space: { type: 'integer' },
                remaining_space: { type: 'integer' }
            }
        }
    }
};

module.exports = {
    postGames,
    postBestValueGames
};