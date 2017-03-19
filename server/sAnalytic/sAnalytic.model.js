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
    // this.db = yield require('./sAnalytic.database.js')(config.database);
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
    return this.db('Feedback').insert({
        feedbackId: uuid.v4(),
        searchId: searchId,
        comment: feedback.comment,
        version: feedback.version,
        email: feedback.email,
        rating: Number(feedback.rating),
        creationTimestamp: Date.now()
    });
};

AnalyticModel.prototype.getAnalytics = co.wrap(function*(version) {
    return {
        feedback: yield this.db.select('*').from('Feedback').where({ version }),
        averageRating: yield this.db('Feedback').where({ version }).avg('rating'),
        numberOfSearches: yield this._getTotalSearches(version),
        numberOfSearchesWithChoice: yield this._getChoiceSearches(version)
    };
});

/* * * * * * * * * *
 *
 * Calls to external services
 *
 * * * * * * * * * */

AnalyticModel.prototype._getTotalSearches = function(version) {
    return this.$services.find('sSearch').get(`/api/v1/search/count/all/${version}`);
};

AnalyticModel.prototype._getChoiceSearches = function(version) {
    return this.$services.find('sSearch').get(`/api/v1/search/count/choice/${version}`);
};
