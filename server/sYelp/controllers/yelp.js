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

/**
 * GET /api/v1/yelp/details/:yelpItemId
 */
YelpCtrl.prototype.getItemDetails = function($input, $error, $done, $service, $logger) {
    const yelpItemId = $input.params.yelpItemId;
    $service.getItemDetails(yelpItemId)
        .then($done)
        .catch($error);
};
