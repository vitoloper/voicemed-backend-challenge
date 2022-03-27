// Game mongoose model

'use strict';

// Module dependencies
const mongoose = require('mongoose');

// Schema definition
const gameSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        minLength: 1
    },
    price: {
        type: Number,
        min: 0

    },
    space: {
        type: Number,
        min: 1
    }
});

// Create model
const Game = mongoose.model('Game', gameSchema);

module.exports = Game;