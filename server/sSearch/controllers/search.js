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
    // let parsedBody = null;
    // try {
    //     parsedBody = JSON.parse(Object.keys($input.body)[0]);
    // } catch(e) {
    //     console.error(e);
    //     $error();
    // }

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
