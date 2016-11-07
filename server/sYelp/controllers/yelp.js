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
    const query = $input.query;

    $service.searchYelp(query)
        .then($done)
        .catch($logger.error($error));
};
