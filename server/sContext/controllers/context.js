'use strict';

const _ = require('lodash');
const { checkAccessToken } = require('./../../utils.js');

module.exports = ContextCtrl;

function ContextCtrl() {}

/* * * * * * * * * *
 *
 * Pre Route
 *
 * * * * * * * * * */

ContextCtrl.prototype.$preRoute = checkAccessToken;

/* * * * * * * * * *
 *
 * Public functions
 *
 * * * * * * * * * */

/**
 * GET /api/v1/context/reverseloc
 */
ContextCtrl.prototype.getReverseLoc = function($done, $error, $input, $service) {
    const lat = $input.query.lat;
    const lng = $input.query.lng;

    if (!lat || !lng) {
        $error('Invalid location, cannot get context.');
    }

    $service.reverseLocation({ lat, lng })
        .then($done)
        .catch($error);
};

/**
 * GET /api/v1/context/outdoors
 */
ContextCtrl.prototype.disableOutdoors = function($input, $done, $error, $service) {
    const location = {
        lat: _.parseInt($input.query.lat),
        lng: _.parseInt($input.query.lng)
    };

    if (!location) {
        throw new Error('Invalid location, cannot verify outdoor activities.');
    }

    $service.isRaining(location)
        .then($done)
        .catch($error);
};
