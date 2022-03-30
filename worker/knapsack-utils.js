/**
 * @description Knapsack 0/1 computation functions
 * @module worker/knapsack-utils
 */

'use strict';

/**
 * @param {object[]} items - array containing games
 * @param {number} W - knapsack weight / max pen-drive space (integer) 
 * @returns {number[][]} Prices table for different games combinations
 */
const computeKnapsackTable = (items, W) => {
    /** @const {number} */
    const n = items.length;

    let i, w;

    /**
     * K is 2d matrix which contains computed values (prices).
     * It is extended progressively by adding a TODO
     * @type {number[][]}
     */
    let K = new Array(n + 1);

    // Build table K[][] bottom-up
    for (i = 0; i <= n; i++) {
        // Extend each row (so we end up with a 2d matrix)
        K[i] = new Array(W + 1);
        for (w = 0; w <= W; w++) {
            if (i == 0 || w == 0) {
                K[i][w] = 0;
            } else if (items[i - 1].space <= w) {
                K[i][w] = Math.max(items[i - 1].price + K[i - 1][w - items[i - 1].space], K[i - 1][w]);
            } else {
                K[i][w] = K[i - 1][w];
            }
        }
    }

    return K;
}

/**
 * @function
 * @description Get the best items (games) given a DP values table
 * @param {number[][]} valuesTable - table containing prices for different games combinations
 * @param {object[]} items - array containing games
 * @param {number} W - knapsack weight / max pen-drive space (integer) 
 * @returns {object[]} Games
 */
const getBestItems = (valuesTable, items, W) => {
    const n = items.length;
    let bestItems = [];
    let w = W;
    let bestValue = valuesTable[n][W];

    for (let i = n; i > 0 && bestValue > 0; i--) {

        /**
         * TODO: comment
         */
        if (bestValue === valuesTable[i - 1][w]) {
            continue;
        } else {
            // This item is included
            bestItems.push(items[i - 1]);

            // Since this weight is included its value is subtracted
            bestValue = bestValue - items[i - 1].price;
            w = w - items[i - 1].space;
        }
    }

    return bestItems;
}

module.exports = {
    computeKnapsackTable,
    getBestItems
}