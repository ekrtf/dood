'use strict';

module.exports = ContextCtrl;

function ContextCtrl() {}

/* * * * * * * * * *
 *
 * Public functions
 *
 * * * * * * * * * */

/**
 * GET /api/v1/context
 */
ContextCtrl.prototype.getContext = function($done, $error, $logger, contextModel) {
    const location = {
        lat: _.parseInt($input.query.lat),
        lng: _.parseInt($input.query.lng)
    };

    if (!location) {
        throw new Error('Invalid location, cannot get context.');
    }

    contextModel.getContext(location)
        .then($done)
        .catch($error);
};

/**
 * GET /api/v1/context/outdoors
 */
ContextCtrl.prototype.disableOutdoors = function($input, $done, $error, $logger, contextModel) {
    const location = {
        lat: _.parseInt($input.query.lat),
        lng: _.parseInt($input.query.lng)
    };

    if (!location) {
        throw new Error('Invalid location, cannot verify outdoor activities.');
    }

    contextModel.disableOutdoors(location)
        .then($done)
        .catch($error);
};
