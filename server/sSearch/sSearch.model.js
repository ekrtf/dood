'use strict';

const _ = require('lodash');
const co = require('co');
const levenshtein = require('fast-levenshtein');
const uuid = require('uuid');

let logger = null;
let config = null;

module.exports = SearchModel;

/* * * * * * * * * *
 *
 * Constructor
 *
 * * * * * * * * * */

function SearchModel($services, $logger, $config) {
    this.db = null;
    this.$services = $services;

    config = $config;
    logger = $logger;
}

/* * * * * * * * * *
 *
 * Initialization
 *
 * * * * * * * * * */

SearchModel.prototype.$init = co.wrap(function*() {
    this.db = yield require('./sSearch.database.js')(config.database);
});

/* * * * * * * * * *
 *
 * Public Functions
 *
 * * * * * * * * * */

/**
 * Search from the clone version
 * @param  {Object} search  user input search
 * @return {Object} result  user results
 */
SearchModel.prototype.cloneSearch = co.wrap(function*(destination, term) {
    const searchId = uuid.v4();
    const searchParams = {
        location: destination,
        term
    };

    // record search
    yield this._createSearch(searchId, searchParams);

    // query yelp and save results
    const yelpResults = yield this._searchYelp(searchParams);
    yield this._saveResults(searchId, 'Yelp', yelpResults);

    return this._getResults(searchId);
});

/**
 * Search from the smart version
 * @param  {Object} userInput
 * @param  {String} location
 * @return {Object} result
 */
SearchModel.prototype.smartSearch = co.wrap(function*(userInput, location) {
    const searchId = uuid.v4();
    const keywords = yield this._getKeywords(userInput);
    const searchParams = {
        term: keywords[0].text,
        location
    };

    // record search
    yield this._createSearch(searchId, searchParams);

    // query yelp and save results
    const yelpResults = yield this._searchYelp(searchParams);
    yield this._saveResults(searchId, 'Yelp', yelpResults);
    
    return this._getResults(searchId);
});

SearchModel.prototype.getItemDetails = co.wrap(function*(itemId) {
    const sourceId = yield this.db('Results')
        .where('resultId', itemId)
        .select('sourceId');

    const resultDetails = yield this._getYelpBusinessDetails(sourceId[0].sourceId);
    yield this._extendResult(itemId, resultDetails);
    const rawResult = yield this.db('Results').where('resultId', itemId);
    return _makeUiReady(rawResult[0]);
});

/* * * * * * * * * *
 *
 * Helper Functions
 *
 * * * * * * * * * */

/**
 * Record user search
 * @param  {Array}  search
 * @return {Object} query
 */
SearchModel.prototype._createSearch = function(searchId, searchParams) {
    return this.db('Searches').insert({
        searchId: searchId,
        params: JSON.stringify(searchParams),
        createdAt: Date.now()
    });
};

/**
 * Save results
 * @param  {Array}  results
 * @return {Object} query
 */
SearchModel.prototype._saveResults = function(searchId, sourceName, results) {
    const resultsPromises = results.map((item) => {
        return this.db('Results').insert({
            resultId: uuid.v4(),
            sourceId: item.id,
            createdAt: Date.now(),
            name: item.name,
            price: item.price,
            rating: item.rating,
            imageUrl: item.image_url,
            location: JSON.stringify({ data: item.location}),
            categories: JSON.stringify({ data: item.categories }),
            sourceName,
            searchId
        });
    });
    return Promise.all(resultsPromises);
};

/**
 * Extand result row with detailed information
 * @param  {Array}  results
 * @return {Object} query
 */
SearchModel.prototype._extendResult = function(resultId, resultDetails) {
    return this.db('Results')
        .where('resultId', resultId)
        .update({
            reviews: JSON.stringify({ data: resultDetails.reviews }),
            images: JSON.stringify({ data: resultDetails.images }),
            coordinates: JSON.stringify({ data: resultDetails.coordinates })
        });
};

/**
 * Get all results for a given search
 * @param  {String} searchId
 * @return {Promise}
 */
SearchModel.prototype._getResults = function(searchId) {
    return this.db.select('*').from('Results').where('searchId', searchId)
        .then((response) => {
            return _.map(response, _makeUiReady);
        });
};

function _makeUiReady(result) {
    result.location = JSON.parse(result.location).data;
    result.categories = JSON.parse(result.categories).data;

    if (result.reviews) {
        result.reviews = JSON.parse(result.reviews).data;
    }
    if (result.images) {
        result.images = JSON.parse(result.images).data;
    }
    if (result.coordinates) {
        result.coordinates = JSON.parse(result.coordinates).data;
    }

    return result;
}

/* * * * * * * * * *
 *
 * Calls to external services
 *
 * * * * * * * * * */

SearchModel.prototype._getConcepts = function(search) {
    const query = { search };
    return this.$services.find('sWatson').post('/api/v1/watson/concepts', query);
};

SearchModel.prototype._getKeywords = function(search) {
    const query = { search };
    return this.$services.find('sWatson').post('/api/v1/watson/keywords', query);
};

SearchModel.prototype._searchYelp = function(query) {
    return this.$services.find('sYelp').post('/api/v1/yelp/query', query)
        .then((response) => {
            if (!_.isArray(response)) {
                throw new Error(`Failed to fetch Yelp results`);
            }
            return response;
        });
};

SearchModel.prototype._getYelpBusinessDetails = function(yelpBusinessId) {
    return this.$services.find('sYelp').get('/api/v1/yelp/details/' + yelpBusinessId);
};
