'use strict';

const _ = require('lodash');

module.exports = SearchCtrl;

function SearchCtrl() {}

/* * * * * * * * * *
 *
 * Public functions
 *
 * * * * * * * * * */

SearchCtrl.prototype.doSearch = function($input, $error, $done, $logger, searchStore) {
    // const userInput = normalizeUserInput($input.body.userQuery);
    // const userInput = $input.body.userQuery;
    // const location = $input.body.location;
    // const filters = $input.body.filters;
    const { destination, fromDate, toDate } = $input.body;

    searchStore.doSearch(destination, fromDate, toDate)
        .then($done)
        .catch($logger.error($error));
};

/* * * * * * * * * *
 *
 * Helper functions
 *
 * * * * * * * * * */

function normalizeUserInput(input) {
    if (_.isArray(input)) {
        return _.map(input, keyword => _.snakeCase(keyword));
    }
    return _.snakeCase(input);
}
