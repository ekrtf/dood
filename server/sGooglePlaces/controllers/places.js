'use strict';

const { checkAccessToken } = require('./../../utils.js');

module.exports = PlacesCtrl;

function PlacesCtrl() {}

/* * * * * * * * * *
 *
 * Pre Route
 *
 * * * * * * * * * */

PlacesCtrl.prototype.$preRoute = checkAccessToken;

/* * * * * * * * * *
 *
 * Public functions
 *
 * * * * * * * * * */

/**
 * GET /api/v1/places/autocomplete
 */
PlacesCtrl.prototype.autoComplete = function($input, $error, $done, $service) {
    const input = $input.query.input;

    $service.autoComplete(input)
        .then($done)
        .catch(function(e) {
            console.error(e);
            $error();
        });
};
