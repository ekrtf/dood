'use strict';

const _ = require('lodash');

module.exports = FoursquareCtrl;

function FoursquareCtrl() {}

/* * * * * * * * * *
 *
 * Public functions
 *
 * * * * * * * * * */

FoursquareCtrl.prototype.searchFoursquare = function($input, $error, $done, $service) {
    const { location, term } = $input.body;

    $service.searchFoursquare(location, term)
        .then($done)
        .catch(function(e) {
            console.log(e);
            $error();
        });
};

FoursquareCtrl.prototype.getFoursquareVenueDetails = function($input, $error, $done, $service) {
    const venueId = $input.params.venueId;

    $service.getFoursquareVenueDetails(venueId)
        .then($done)
        .catch(function(e) {
            console.log(e);
            $error();
        });
};

FoursquareCtrl.prototype.getFoursquareCategories = function($input, $error, $done, $service) {
    $service.getFoursquareCategories()
        .then($done)
        .catch(function(e) {
            console.log(e);
            $error();
        });
};
