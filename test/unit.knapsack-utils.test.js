/**
 * knapsack-utils computation functions tests
 * 
 */

// Datasets used for testing can be found here:
// https://people.sc.fsu.edu/~jburkardt/datasets/knapsack_01/knapsack_01.html

'use strict';

const expect = require('chai').expect;
const { computeKnapsackTable, getBestItems } = require('../worker/knapsack-utils');

describe('Knapsack computation', function () {
    describe('P01', function () {
        it('should return the optimal selection of items', function () {
            /** @const {number} - knapsack capacity */
            const W = 165;

            /** @const {object} - items */
            const items = [
                {
                    id: 1,
                    price: 92,
                    space: 23
                },
                {
                    id: 2,
                    price: 57,
                    space: 31
                },
                {
                    id: 3,
                    price: 49,
                    space: 29
                },
                {
                    id: 4,
                    price: 68,
                    space: 44
                },
                {
                    id: 5,
                    price: 60,
                    space: 53
                },
                {
                    id: 6,
                    price: 43,
                    space: 38
                },
                {
                    id: 7,
                    price: 67,
                    space: 63
                },
                {
                    id: 8,
                    price: 84,
                    space: 85
                },
                {
                    id: 9,
                    price: 87,
                    space: 89
                },
                {
                    id: 10,
                    price: 72,
                    space: 82
                }
            ];

            // Compute values table
            const valuesTable = computeKnapsackTable(items, W);

            // Compute best items array
            const bestItems = getBestItems(valuesTable, items, W);

            // Check optimal result
            expect(bestItems).to.have.deep.members(
                [
                    {
                        id: 1,
                        price: 92,
                        space: 23
                    },
                    {
                        id: 2,
                        price: 57,
                        space: 31
                    },
                    {
                        id: 3,
                        price: 49,
                        space: 29
                    },
                    {
                        id: 4,
                        price: 68,
                        space: 44
                    },
                    {
                        id: 6,
                        price: 43,
                        space: 38
                    }
                ]
            );
        }); // it(...)
    });

    describe('P06', function () {
        it('should return the optimal selection of items', function () {
            /** @const {number} - knapsack capacity */
            const W = 170;

            /** @const {object} - items */
            const items = [
                {
                    id: 1,
                    price: 442,
                    space: 41
                },
                {
                    id: 2,
                    price: 525,
                    space: 50
                },
                {
                    id: 3,
                    price: 511,
                    space: 49
                },
                {
                    id: 4,
                    price: 593,
                    space: 59
                },
                {
                    id: 5,
                    price: 546,
                    space: 55
                },
                {
                    id: 6,
                    price: 564,
                    space: 57
                },
                {
                    id: 7,
                    price: 617,
                    space: 60
                }
            ];

            // Compute values table
            const valuesTable = computeKnapsackTable(items, W);

            // Compute best items array
            const bestItems = getBestItems(valuesTable, items, W);

            // Check optimal result
            expect(bestItems).to.have.deep.members(
                [
                    {
                        id: 2,
                        price: 525,
                        space: 50
                    },
                    {
                        id: 4,
                        price: 593,
                        space: 59
                    },
                    {
                        id: 7,
                        price: 617,
                        space: 60
                    }
                ]
            );
        }); // it(...)
    });

    describe('P07', function () {
        it('should return the optimal selection of items', function () {
            /** @const {number} - knapsack capacity */
            const W = 750;

            /** @const {object} - items */
            const items = [
                {
                    id: 1,
                    price: 135,
                    space: 70
                },
                {
                    id: 2,
                    price: 139,
                    space: 73
                },
                {
                    id: 3,
                    price: 149,
                    space: 77
                },
                {
                    id: 4,
                    price: 150,
                    space: 80
                },
                {
                    id: 5,
                    price: 156,
                    space: 82
                },
                {
                    id: 6,
                    price: 163,
                    space: 87
                },
                {
                    id: 7,
                    price: 173,
                    space: 90
                },
                {
                    id: 8,
                    price: 184,
                    space: 94
                },
                {
                    id: 9,
                    price: 192,
                    space: 98
                },
                {
                    id: 10,
                    price: 201,
                    space: 106
                },
                {
                    id: 11,
                    price: 210,
                    space: 110
                },
                {
                    id: 12,
                    price: 214,
                    space: 113
                },
                {
                    id: 13,
                    price: 221,
                    space: 115
                },
                {
                    id: 14,
                    price: 229,
                    space: 118
                },
                {
                    id: 15,
                    price: 240,
                    space: 120
                },
            ];

            // Compute values table
            const valuesTable = computeKnapsackTable(items, W);

            // Compute best items array
            const bestItems = getBestItems(valuesTable, items, W);

            // Check optimal result
            expect(bestItems).to.have.deep.members(
                [
                    {
                        id: 1,
                        price: 135,
                        space: 70
                    },
                    {
                        id: 3,
                        price: 149,
                        space: 77
                    },
                    {
                        id: 5,
                        price: 156,
                        space: 82
                    },
                    {
                        id: 7,
                        price: 173,
                        space: 90
                    },
                    {
                        id: 8,
                        price: 184,
                        space: 94
                    },
                    {
                        id: 9,
                        price: 192,
                        space: 98
                    },
                    {
                        id: 14,
                        price: 229,
                        space: 118
                    },
                    {
                        id: 15,
                        price: 240,
                        space: 120
                    }
                ]
            );
        }); // it(...)
    });
});
