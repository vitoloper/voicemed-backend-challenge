/**
 * @description Best value result mongoose model
 * @module models/best-value-result
 */

'use strict';

// Module dependencies
const mongoose = require('mongoose');

// Schema definition
const bestValueResultSchema = new mongoose.Schema({
    games: [{
        name: {
            type: String,
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
    }],
    total_space: { type: Number },
    remaining_space: { type: Number },
    createdAt: { type: Date, expires: 600 } // TTL: 10 minutes
});

// Add creation date before saving
bestValueResultSchema.pre('save', function (next) {
    if (!this.createdAt) this.createdAt = new Date;
    next();
});

// Create model
const BestValueResult = mongoose.model('BestValueResult', bestValueResultSchema);

module.exports = BestValueResult;