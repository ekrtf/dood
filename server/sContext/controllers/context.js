'use strict';

var prettyjson = require('prettyjson');

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
ContextCtrl.prototype.getContext = function($done, $error, contextStore) {
    var location = {
        lat: _.parseInt($input.query.lat),
        lng: _.parseInt($input.query.lng)
    };

    if (!location) {
        throw new Error('Invalid location, cannot get context.');
    }

    contextStore.getContext(location)
        .then($done)
        .catch(catchHelper($error));
};

/**
 * GET /api/v1/context/outdoors
 */
ContextCtrl.prototype.disableOutdoors = function($input, $done, $error, contextStore) {
    var location = {
        lat: _.parseInt($input.query.lat),
        lng: _.parseInt($input.query.lng)
    };

    if (!location) {
        throw new Error('Invalid location, cannot verify outdoor activities.');
    }

    contextStore.disableOutdoors(location)
        .then($done)
        .catch(catchHelper($error));
};

/* * * * * * * * * *
 *
 * Helper functions
 *
 * * * * * * * * * */

function catchHelper($done) {
    return function(err) {
        console.error(prettyjson.render(err));
        $done(err.message);
    }
}
