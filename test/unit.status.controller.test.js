'use strict';

// Module dependencies
const sinon = require('sinon');
const expect = require('chai').expect;
const statusController = require('../controllers/status.controller');
const statusService = require('../services/status.service');

describe('Status Controller', function () {
    let getDbConnStatusStub;

    beforeEach(function () {
        // Service function stub
        getDbConnStatusStub = sinon.stub(statusService, 'getDbConnStatus');
    });

    afterEach(function () {
        // Restore the original function
        getDbConnStatusStub.restore();
    });

    describe('#getDbConnStatus', function () {
        it('should return {"database": "healthy"} and status code 200 when db connection is healthy', async function () {
            let request = {};
            let reply = { statusCode: 200 };

            // Make the stub return a promise which resolves to the provided value
            getDbConnStatusStub.resolves(true);

            let result = await statusController.getDbConnStatus(request, reply);
            expect(result).to.be.an('object');
            expect(result).to.have.a.property('database').to.equal('healthy');
        });

        it('should return {"database": "unhealthy"} and status code 503 when db connection is unhealthy', async function () {
            let request = {};
            let reply = { statusCode: 200 };

            // Make the stub return a promise which resolves to the provided value
            getDbConnStatusStub.resolves(false);

            let result = await statusController.getDbConnStatus(request, reply);
            expect(result).to.be.an('object');
            expect(result).to.have.a.property('database').to.equal('unhealthy');
            expect(reply.statusCode).to.equal(503);
        });

    });

});
