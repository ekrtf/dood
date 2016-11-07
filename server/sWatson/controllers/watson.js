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
WatsonCtrl.prototype.conceptExpansion = function($input, $error, $done, $service, $logger) {
    const search = $input.body.search;
    const label = $input.body.label || null;

    $service.conceptExpansion(search, label)
        .then($done)
        .catch($logger.error($error));
};

WatsonCtrl.prototype.languageAlchemy = function($input, $error, $done, $service, $logger) {
    const search = $input.body.search;

    $service.languageAlchemy(search)
        .then($done)
        .catch($logger.error($error));
};

