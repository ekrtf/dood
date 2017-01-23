'use strict';

const _ = require('lodash');

module.exports = SearchCtrl;

function SearchCtrl() {}

/* * * * * * * * * *
 *
 * Public functions
 *
 * * * * * * * * * */

SearchCtrl.prototype.doSearch = function($input, $error, $done, searchModel) {
    const { destination, term } = $input.body;
    searchModel.doSearch(destination, term)
        .then($done)
        .catch(function(e) {
            console.log(e);
            $error();
        });
};

SearchCtrl.prototype.getItemDetails = function($input, $error, $done, searchModel) {
    const itemId = $input.params.itemId;
    searchModel.getItemDetails(itemId)
        .then($done)
        .catch(function(e) {
            console.log(e);
            $error();
        });
};

SearchCtrl.prototype.smartSearch = function($input, $error, $done, searchModel) {
    const text = $input.body.search;
    const location = $input.body.location;

    searchModel.smartSearch(text, location)
        .then($done)
        .catch(function(e) {
            console.log(e);
            $error();
        });
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
