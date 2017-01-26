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
AnalyticModel.prototype.logFeedback = function(feedback) {
    const self = this;

    return co(function*() {
        const feedbackId = uuid.v4();
        return self.db('Feedback').insert({
            feedbackId: feedbackId,
            searchId: 'TODO',
            comment: feedback.comment,
            email: feedback.email,
            rating: Number(feedback.rating),
            createdAt: Date.now()
        });
    });
};

/* * * * * * * * * *
 *
 * Calls to external services
 *
 * * * * * * * * * */

