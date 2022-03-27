// Games routes schemas

'use strict';

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

module.exports = {
    postGames
};