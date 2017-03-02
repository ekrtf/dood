'use strict';

const _ = require('lodash');
const co = require('co');
const uuid = require('uuid');

let config = null;

module.exports = AnalyticModel;

/* * * * * * * * * *
 *
 * Constructor
 *
 * * * * * * * * * */

function AnalyticModel($services, $config) {
    this.db = null;
    this.$services = $services;
    config = $config;
}

/* * * * * * * * * *
 *
 * Initialization
 *
 * * * * * * * * * */

AnalyticModel.prototype.$init = co.wrap(function*() {
    this.db = yield require('./sAnalytic.database.js')(config.database);
});

/* * * * * * * * * *
 *
 * Public Functions
 *
 * * * * * * * * * */

/**
 * Insert a user's feedback into the database
 * @param  {Object} feedback
 * @return {Promise}
 */
AnalyticModel.prototype.logFeedback = function(searchId, feedback) {
    const self = this;
    return self.db('Feedback').insert({
        feedbackId: uuid.v4(),
        searchId: searchId,
        comment: feedback.comment,
        version: feedback.version,
        email: feedback.email,
        rating: Number(feedback.rating),
        createdAt: Date.now()
    });
};

/* * * * * * * * * *
 *
 * Calls to external services
 *
 * * * * * * * * * */

