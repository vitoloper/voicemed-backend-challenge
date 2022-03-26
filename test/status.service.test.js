'use strict';

// Module dependencies
const sinon = require('sinon');
const expect = require('chai').expect;
const statusService = require('../services/status.service');
const helpers = require('../helpers/status.helpers.js');

describe('Status Service', function () {
    let connReadyStateStub;

    beforeEach(function () {
        // Helper function stub
        connReadyStateStub = sinon.stub(helpers, 'getMongooseConnReadyState');
    });

    afterEach(function () {
        // Restore the original function
        connReadyStateStub.restore();
    });

    describe('#getDbConnStatus', function () {
        it('should return true when db connection is healthy', async function () {
            // Make the stub return the provided value
            connReadyStateStub.returns(1);

            let result = await statusService.getDbConnStatus();
            expect(result).to.equal(true);
        });

    });

    describe('#getDbConnStatus', function () {
        it('should return false when db connection is unhealthy', async function () {
            // Make the stub return the provided value
            connReadyStateStub.returns(0);

            let result = await statusService.getDbConnStatus();
            expect(result).to.equal(false);
        });

    });

});
