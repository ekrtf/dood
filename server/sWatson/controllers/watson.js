'use strict';

var prettyjson = require('prettyjson');

module.exports = WatsonCtrl;

function WatsonCtrl() {}

/* * * * * * * * * *
 *
 * Public functions
 *
 * * * * * * * * * */

/**
 * POST /api/v1/watson/conceptExpansion
 */
WatsonCtrl.prototype.conceptExpansion = function($input, $error, $done, $service) {
    var search = $input.body.search;
    var label = $input.body.label || null;

    $service.conceptExpansion(search, label)
        .then($done)
        .catch(catchHelper($error));
};

WatsonCtrl.prototype.languageAlchemy = function($input, $error, $done, $service) {
    var search = $input.body.search;

    $service.languageAlchemy(search)
        .then($done)
        .catch(catchHelper($error));
};

/* * * * * * * * * *
 *
 * Helper functions
 *
 * * * * * * * * * */

function catchHelper($done) {
    return function(err) {
        console.error(prettyjson.render(err));
        $done(err.message);
    }
}
