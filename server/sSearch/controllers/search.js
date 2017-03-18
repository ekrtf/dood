'use strict';

const _ = require('lodash');
const { checkAccessToken } = require('./../../utils.js');

module.exports = SearchCtrl;

function SearchCtrl() {}

/* * * * * * * * * *
 *
 * Pre Route
 *
 * * * * * * * * * */

SearchCtrl.prototype.$preRoute = checkAccessToken;

/* * * * * * * * * *
 *
 * Public functions
 *
 * * * * * * * * * */

SearchCtrl.prototype.cloneSearch = function($input, $error, $done, searchModel) {
    const { location, term } = $input.body;

    searchModel.cloneSearch(location, term)
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

    console.log('smart search body', $input.body)

    searchModel.smartSearch(text, location)
        .then($done)
        .catch(function(e) {
            console.log(e);
            $error();
        });
};

SearchCtrl.prototype.saveChoice = function($input, $error, $done, searchModel) {
    const searchId = $input.body.searchId;
    const resultId = $input.body.resultId;

    searchModel.saveChoice(searchId, resultId)
        .then(() => {
            $done({
                code: 200,
                message: 'Choice saved successfully'
            });
        })
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

const t = new SearchCtrl()
