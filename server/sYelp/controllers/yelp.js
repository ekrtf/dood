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
        .catch(function(e) {
            console.error(e);
            $error();
        });
};

/**
 * GET /api/v1/yelp/details/:yelpItemId
 */
YelpCtrl.prototype.getYelpBusinessDetails = function($input, $error, $done, $service, $logger) {
    const yelpBusinessId = $input.params.yelpBusinessId;
    $service.getYelpBusinessDetails(yelpBusinessId)
        .then($done)
        .catch(function(e) {
            console.error(e);
            $error();
        });
};
