'use strict';

module.exports = WatsonCtrl;

function WatsonCtrl() {}

/* * * * * * * * * *
 *
 * Public functions
 *
 * * * * * * * * * */

/**
 * POST /api/v1/watson/concepts
 */
WatsonCtrl.prototype.concepts = function($input, $error, $done, $service) {
    const search = $input.body.search;
    $service.concepts(search)
        .then($done)
        .catch($error);
};

/**
 * POST /api/v1/watson/keywords
 */
WatsonCtrl.prototype.keywords = function($input, $error, $done, $service) {
    const search = $input.body.search;
    $service.keywords(search)
        .then($done)
        .catch($error);
};

/**
 * POST /api/v1/watson/emotion
 */
WatsonCtrl.prototype.emotion = function($input, $error, $done, $service) {
    const search = $input.body.search;
    $service.emotion(search)
        .then($done)
        .catch($error);
};
