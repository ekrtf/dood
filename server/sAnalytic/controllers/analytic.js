'use strict';

const _ = require('lodash');
const { checkAccessToken } = require('./../../utils.js');

module.exports = AnalyticCtrl;

function AnalyticCtrl() {}

/* * * * * * * * * *
 *
 * Pre Route
 *
 * * * * * * * * * */

AnalyticCtrl.prototype.$preRoute = checkAccessToken;

/* * * * * * * * * *
 *
 * Public functions
 *
 * * * * * * * * * */

AnalyticCtrl.prototype.logFeedback = function($input, $error, $done, analyticModel) {
    const searchId = $input.body.searchId;
    const feedback = $input.body;

    analyticModel.logFeedback(searchId, feedback)
        .then($done)
        .catch(function(e) {
            console.log(e);
            $error();
        });
};
