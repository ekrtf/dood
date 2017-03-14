'use strict';

module.exports = ZomatoCtrl;

function ZomatoCtrl() {}

/* * * * * * * * * *
 *
 * Public functions
 *
 * * * * * * * * * */

/**
 * GET /api/v1/zomato/search
 */
ZomatoCtrl.prototype.searchZomato = function($input, $error, $done, $service) {
    let { location, term } = $input.query;

    $service.searchZomato(location, term)
        .then($done)
        .catch(function(e) {
            console.error(e);
            $error();
        });
};

/**
 * GET /api/v1/zomato/details/:restaurantId
 */
ZomatoCtrl.prototype.getZomatoRestaurantDetails = function($input, $error, $done, $service) {
    const restaurantId = $input.params.restaurantId;

    $service.getZomatoRestaurantDetails(restaurantId)
        .then($done)
        .catch(function(e) {
            console.error(e);
            $error();
        });
};
