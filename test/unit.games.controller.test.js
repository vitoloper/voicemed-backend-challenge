'use strict';

// Module dependencies
const sinon = require('sinon');
const assert = require('assert');
const expect = require('chai').expect;
const gamesController = require('../controllers/games.controller');
const gamesService = require('../services/games.service');

describe('Games Controller', function () {
    let saveGameStub;

    beforeEach(function () {
        // Service function stub
        saveGameStub = sinon.stub(gamesService, 'saveGame');
    });

    afterEach(function () {
        // Restore the original function
        saveGameStub.restore();
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
    });

    describe('#saveGame_v1', function () {
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

});