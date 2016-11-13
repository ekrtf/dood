'use strict';

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
YelpCtrl.prototype.searchYelp = function($input, $error, $done, $service, $logger) {
    const { location, term } = $input.body;
    $service.searchYelp(location, term)
        .then($done)
        .catch($error);
};
