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
    const searchParams = {
        location: destination,
        term
    };

    // if this search has already been done, return results
    const existingSearchId = yield this._checkIfSearchExists(searchParams)
    if (_.isString(existingSearchId)) {
        return this._getResults(existingSearchId);
    }

    // record search
    const searchId = uuid.v4();
    yield this._createSearch(searchId, searchParams, 'clone');

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
    const keyword = yield this._getKeywords(userInput);
    const searchParams = {
        term: keyword,
        location
    };

    // if this search has already been done, return results
    const existingSearchId = yield this._checkIfSearchExists(searchParams)
    if (_.isString(existingSearchId)) {
        return this._getResults(existingSearchId);
    }

    // record search
    const searchId = uuid.v4();
    yield this._createSearch(searchId, searchParams, 'ml');

    // query yelp and save results
    const yelpResults = yield this._searchYelp(searchParams);
    yield this._saveResults(searchId, 'Yelp', yelpResults);
    
    const response = yield this._getResults(searchId);
    return {
        searchId: response.searchId,
        results: response.results.slice(0, 6) // display top 6 only
    };
});

SearchModel.prototype.getItemDetails = co.wrap(function*(itemId) {
    const sourceId = yield this.db('Results')
        .where('resultId', itemId)
        .select('sourceId');

    const resultDetails = yield this._getYelpBusinessDetails(sourceId[0].sourceId);
    yield this._extendResult(itemId, resultDetails);
    const rawResult = yield this.db('Results').where('resultId', itemId);
    return stringifyJsonColumns(rawResult[0]);
});

SearchModel.prototype.saveChoice = function(searchId, resultId) {
    return this.db('Searches')
        .where('searchId', searchId)
        .update({
            choice: resultId
        });
};

/* * * * * * * * * *
 *
 * Private Functions
 *
 * * * * * * * * * */

/**
 * Check if the results exist in DB
 * @param  {Object}  search
 * @return {Object} query
 */
SearchModel.prototype._checkIfSearchExists = co.wrap(function*(searchParams) {
    const search = yield this.db('Searches').where(searchParams).select('searchId');
    return _.get(search, '[0].searchId', undefined);
});

/**
 * Record user search
 * @param  {Array}  search
 * @return {Object} query
 */
SearchModel.prototype._createSearch = function(searchId, searchParams, version) {
    return this.db('Searches').insert({
        searchId: searchId,
        version: version,
        location: searchParams.location,
        term: searchParams.term,
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
            return {
                searchId: searchId,
                results: _.map(response, stringifyJsonColumns)
            };
        });
};

/**
 * Get keywords from DB or Watson
 * @param  {String} userInput
 * @return {Promise}
 */
SearchModel.prototype._getKeywords = co.wrap(function*(userInput) {
    const dbQuery = yield this.db('keywords').where({ userInput }).select('keyword');
    const keyword = _.get(dbQuery, '[0].keyword', undefined);
    
    // if the keyword is in the db, return it
    if (_.isString(keyword)) {
        return keyword;
    }

    // otherwise query Watson
    const watsonKeywords = yield this._getWatsonKeywords(userInput);
    const savedKeyword = watsonKeywords[0].text
    yield this._createKeyword(userInput, savedKeyword);
    return savedKeyword;
});

/**
 * Insert Watson results into DB
 * @param  {String} searchId
 * @return {Promise}
 */
SearchModel.prototype._createKeyword = function(userInput, keyword) {
    return this.db('Keywords').insert({
        keywordId: uuid.v4(),
        createdAt: Date.now(),
        keyword,
        userInput
    });
};

function stringifyJsonColumns(result) {
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

SearchModel.prototype._getWatsonKeywords = function(search) {
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
