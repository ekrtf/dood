'use strict';

var _          = require('lodash');
var prettyjson = require('prettyjson');

module.exports = SearchCtrl;

function SearchCtrl() {}

/* * * * * * * * * *
 *
 * Public functions
 *
 * * * * * * * * * */

SearchCtrl.prototype.doSearch = function($input, $error, $done, searchStore) {
    // var userInput = normalizeUserInput($input.body.userQuery);
    var userInput = $input.body.userQuery;
    var location = $input.body.location;
    var filters = $input.body.filters;

    searchStore.doSearch(userInput, location, filters)
        .then($done)
        .catch(catchHelper($error));
};

/* * * * * * * * * *
 *
 * Helper functions
 *
 * * * * * * * * * */

function normalizeUserInput(input) {
    if (_.isArray(input)) {
        return _.map(input, function(keyword) {
            return _.snakeCase(keyword);
        });
    }
    else {
        return _.snakeCase(input);
    }
}

function catchHelper($done) {
    return function(err) {
        console.error(prettyjson.render(err));
        $done(err.message);
    }
}
