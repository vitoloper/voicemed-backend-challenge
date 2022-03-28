'use strict';

// Module dependencies
const sinon = require('sinon');
const proxyquire = require('proxyquire').noCallThru();
const expect = require('chai').expect;
const assert = require('assert');

/**
 * Best value games mock result object
 * @const {object}
 */
const best_value_games = {
    "games": [
        {
            "name": "Super Game",
            "price": 71.7,
            "space": 1073741824
        },
        {
            "name": "Extra Game",
            "price": 100.78,
            "space": 2147483648
        }
    ],
    "total_space": 3221225472,
    "remaining_space": 1024
};

/**
 * @class
 * @classdesc Mock Bull singleton job queue helper class
 * @see helpers/bull.singleton.job
 */
class MockBullJobClass {
    constructor(queueName, options) {
        if (!MockBullJobClass.instance) {
            MockBullJobClass.instance = {
                /** 
                 * @async
                 * @function add
                 */
                add: async () => {
                    return {
                        id: 1,
                        finished: async () => {
                            return best_value_games;
                        }
                    }
                },
            };
        }
    }

    getInstance() {
        return MockBullJobClass.instance;
    }
}

/**
 * @class
 * @classdesc Mock Bull singleton job queue helper class (finished() throws error)
 * @see helpers/bull.singleton.job
 */
class MockBullJobClassRejects {
    constructor(queueName, options) {
        if (!MockBullJobClassRejects.instance) {
            MockBullJobClassRejects.instance = {
                /** 
                 * @async
                 * @function add
                 */
                add: async () => {
                    return {
                        id: 1,
                        finished: async () => {
                            throw new Error('Job failed');
                        }
                    }
                },
            };
        }
    }

    getInstance() {
        return MockBullJobClassRejects.instance;
    }
}

describe('Games Service', function () {
    let gamesServiceProxy;
    let gamesServiceProxyRejects;

    before(function () {
        // Mock the whole BullSingletonJob class used in gamesService module
        gamesServiceProxy = proxyquire('../services/games.service',
            { '../helpers/bull.singleton.job.helper': MockBullJobClass });

        gamesServiceProxyRejects = proxyquire('../services/games.service',
            { '../helpers/bull.singleton.job.helper': MockBullJobClassRejects });
    });

    after(function () {
    });

    describe('#bestValueGames', function () {
        it('should return the best value games that fit into a pen-drive given the available pen drive space', async function () {
            const result = await gamesServiceProxy.bestValueGames(1024 * 1024 * 1024);
            expect(result).to.be.an('object');
            expect(result).to.deep.equal(best_value_games);
        });

        it('should reject with an error if the job fails', async function () {
            await assert.rejects(gamesServiceProxyRejects.bestValueGames(1024 * 1024 * 1024));
        });
    });
});