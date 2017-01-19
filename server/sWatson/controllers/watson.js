'use strict';

module.exports = WatsonCtrl;

function WatsonCtrl() {}

/* * * * * * * * * *
 *
 * Public functions
 *
 * * * * * * * * * */

/**
 * POST /api/v1/watson/conceptExpansion
 */
WatsonCtrl.prototype.concepts = function($input, $error, $done, $service) {
    const search = $input.body.search;

    $service.concepts(search)
        .then($done)
        .catch($error);
};

WatsonCtrl.prototype.keywords = function($input, $error, $done, $service) {
    const search = $input.body.search;

    $service.keywords(search)
        .then($done)
        .catch($error);
};

WatsonCtrl.prototype.emotion = function($input, $error, $done, $service) {
    const search = $input.body.search;

    $service.emotion(search)
        .then($done)
        .catch($error);
};
