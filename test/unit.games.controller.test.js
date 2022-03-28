'use strict';

// Module dependencies
const sinon = require('sinon');
const assert = require('assert');
const expect = require('chai').expect;
const gamesController = require('../controllers/games.controller');
const gamesService = require('../services/games.service');

describe('Games Controller', function () {
    let saveGameStub;
    let bestValueGamesStub;

    beforeEach(function () {
        // Service functions stub
        saveGameStub = sinon.stub(gamesService, 'saveGame');
        bestValueGamesStub = sinon.stub(gamesService, 'bestValueGames');
    });

    afterEach(function () {
        // Restore the original function
        saveGameStub.restore();
        bestValueGamesStub.restore();
    });

    describe('#saveGame_v1', function () {
        it('should return the saved game', async function () {
            const request = {
                body: {
                    name: 'Sim City 3000',
                    price: 50,
                    space: 524288000
                }
            };
            const reply = {};

            // Causes the stub to return a Promise which resolves to the first argument
            saveGameStub.resolvesArg(0);

            const result = await gamesController.saveGame_v1(request, reply);

            expect(result).to.be.an('object');
            expect(result).to.deep.equal(request.body);
        });

        it('should reject with an error when gamesService.saveGame rejects with an error', async function () {
            const request = {
                body: {
                    name: 'Sim City 3000',
                    price: 50,
                    space: 524288000
                }
            };
            const reply = {};

            // Causes the stub to throw an exception
            saveGameStub.rejects();

            await assert.rejects(gamesController.saveGame_v1(request, reply));

        });
    });

    describe('#bestValueGames_v1', function () {
        it('should return the best value games that fit into a pen-drive', async function () {
            const request = { query: { pen_drive_space: 1073741824 } };
            const reply = {};
            const serviceResult = {
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
                "total_space": 3221225472, // total space of games
                "remaining_space": 1024 // empty space on the pen-drive after download
            };

            // Make the stub return a promise which resolves to the value provided
            bestValueGamesStub.resolves(serviceResult);

            const result = await gamesController.bestValueGames_v1(request, reply);

            expect(result).to.be.an('object');
            expect(result).to.deep.equal(serviceResult);
        });

        it('should reject with an error when gamesService.bestValueGames rejects with an error', async function () {
            const request = { query: { pen_drive_space: 1073741824 } };
            const reply = {};
            const serviceResult = {
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
                "total_space": 3221225472, // total space of games
                "remaining_space": 1024 // empty space on the pen-drive after download
            };

            // Make promise reject
            bestValueGamesStub.rejects();

            await assert.rejects(gamesController.bestValueGames_v1(request, reply));
        });
    });
});