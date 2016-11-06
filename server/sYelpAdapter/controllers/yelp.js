'use strict';

var prettyjson = require('prettyjson');

module.exports = YelpCtrl;

function YelpCtrl() {}

/* * * * * * * * * *
 *
 * Public functions
 *
 * * * * * * * * * */

/**
 * GET /api/v1/yelp/query
 */
YelpCtrl.prototype.searchYelp = function($input, $error, $done, $service) {
    var query = $input.query;

    $service.searchYelp(query)
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
