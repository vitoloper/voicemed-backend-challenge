/**
 * best_value_games worker integration tests
 */

'use strict';

// Module dependencies
const { spawn } = require('child_process');
const Queue = require('bull');
const expect = require('chai').expect;
var assert = require('assert');
const mongoose = require('mongoose');
const Game = require('../models/game.model');
const BestValueResult = require('../models/best-value-result.model');

// Load configuration
const config = require('../config/app.config');

// Set mongoose connection 'connected' event listener
// mongoose.connection.on('connected', () => {
//     console.info(`Connected to database at ${config.db.uri}`);
// });

describe('Worker Integration', function () {
    /** @const object */
    let worker;

    /** @const object */
    let jobQueue;

    before(async function () {
        // Create worker if not in a containerized environment
        if (process.env.RUNNING_IN_CONTAINER !== 'true') {
            worker = spawn('node', ['./worker/worker.js']);
        }

        // Connect to database
        await mongoose.connect(config.db.uri, config.db.options);

        // Connect to queue
        jobQueue = new Queue(config.bull.jobQueueName, config.redis.uri);

        // Test data to write on the database
        // Datasets P01
        // knapsack capacity: 165
        // https://people.sc.fsu.edu/~jburkardt/datasets/knapsack_01/knapsack_01.html
        const items = [
            {
                name: 'Game 1',
                price: 92,
                space: 23
            },
            {
                name: 'Game 2',
                price: 57,
                space: 31
            },
            {
                name: 'Game 3',
                price: 49,
                space: 29
            },
            {
                name: 'Game 4',
                price: 68,
                space: 44
            },
            {
                name: 'Game 5',
                price: 60,
                space: 53
            },
            {
                name: 'Game 6',
                price: 43,
                space: 38
            },
            {
                name: 'Game 7',
                price: 67,
                space: 63
            },
            {
                name: 'Game 8',
                price: 84,
                space: 85
            },
            {
                name: 'Game 9',
                price: 87,
                space: 89
            },
            {
                name: 'Game 10',
                price: 72,
                space: 82
            }
        ];

        await Game.insertMany(items);
    });

    after(async function () {
        // Remove all documents in the collection
        await Game.deleteMany({});

        // Remove all completed job results
        await BestValueResult.deleteMany({});

        // Disconnect from database
        await mongoose.disconnect();

        // Close queue
        await jobQueue.close();

        // Terminate worker process if not in a containerized environment
        if (process.env.RUNNING_IN_CONTAINER !== 'true') {
            worker.kill('SIGTERM');
        }
    });


    // Write some test data on to db in games collection
    describe('Handle incoming jobs', function () {

        it('should save the result in the database and return the saved document id', async function () {
            // Increase mocha.js timeout just to be safe
            this.timeout(5000);

            /** @const {number} */
            const penDriveSpace = 165;

            // Create new job
            const job = await jobQueue.add({ pen_drive_space: penDriveSpace });

            // Get job result
            const jobResult = await job.finished();

            /** @const {string} - mongoose object id */
            const bestValueResultId = jobResult.id;

            // Check that id property is a string
            expect(bestValueResultId).to.be.a('string');

            // Get best value result from database
            const result = await BestValueResult.findById(mongoose.Types.ObjectId(bestValueResultId)).lean();

            /** @const {object[]} */
            const games = result.games;

            // Expectations on games included
            expect(games.map(item => item.name)).to.include("Game 1");
            expect(games.map(item => item.name)).to.include("Game 2");
            expect(games.map(item => item.name)).to.include("Game 3");
            expect(games.map(item => item.name)).to.include("Game 4");
            expect(games.map(item => item.name)).to.not.include("Game 5");
            expect(games.map(item => item.name)).to.include("Game 6");
            expect(games.map(item => item.name)).to.not.include("Game 7");
            expect(games.map(item => item.name)).to.not.include("Game 8");
            expect(games.map(item => item.name)).to.not.include("Game 9");
            expect(games.map(item => item.name)).to.not.include("Game 10");

            // Expectations on total_space and remaining_space fields
            expect(result).to.have.a.property('total_space').to.equal(165);
            expect(result).to.have.a.property('remaining_space').to.equal(0);
        }); // it

        it('should reject with an error if pen_drive_space is not in job data', async function () {
            // Create new job
            const job = await jobQueue.add({ no_useful_field: 1010 });

            // Get job result (expect a rejection)
            await assert.rejects(job.finished());
        });
    });
});