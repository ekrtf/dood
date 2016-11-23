'use strict';

let log = null;

module.exports = YelpCtrl;

function YelpCtrl($logger) {
    log = $logger;
}

/* * * * * * * * * *
 *
 * Public functions
 *
 * * * * * * * * * */

/**
 * GET /api/v1/yelp/query
 */
YelpCtrl.prototype.searchYelp = function($input, $error, $done, $service, $logger) {
    let { location, term } = $input.body;
    if (!location) {
        log.warn('No location provided to Yelp. Default to "London"');
        location = 'London';
    }
    if (!term) {
        log.warn('No term provided to Yelp. Default to "hotel"');
        term = 'hotel';
    }

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
