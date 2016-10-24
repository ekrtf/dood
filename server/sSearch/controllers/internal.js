'use strict';

const _ = require('lodash');

module.exports = SearchInternalCtrl;

function SearchInternalCtrl() {}

/* * * * * * * * * *
 *
 * Public functions
 *
 * * * * * * * * * */

SearchInternalCtrl.prototype.getAllSearches = function($input, $error, $done, searchModel) {
    const version = $input.params.version;

    searchModel.getAllSearches(version)
        .then($done)
        .catch(function(e) {
            console.log(e);
            $error();
        });
};

SearchInternalCtrl.prototype.getChoiceSearches = function($input, $error, $done, searchModel) {
    const version = $input.params.version;

    searchModel.getChoiceSearches(version)
        .then($done)
        .catch(function(e) {
            console.log(e);
            $error();
        });
};


