'use strict';

const _ = require('lodash');
const co = require('co');
const levenshtein = require('fast-levenshtein');
const uuid = require('uuid');

let config = null;

module.exports = SearchModel;

/* * * * * * * * * *
 *
 * Constructor
 *
 * * * * * * * * * */

function SearchModel($services, $config) {
    this.db = null;
    this.$services = $services;
    config = $config;
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
 * Search function for the clone version. It only queries Yelp.
 *
 * @param  {Object} search  user input search
 * @return {Object} result  user results
 */
SearchModel.prototype.cloneSearch = co.wrap(function*(location, term) {
    const searchParams = { location, term };

    // record search
    const searchId = uuid.v4();
    yield this._createSearch(searchId, searchParams, 'clone');

    // if this search has already been done, return results
    const existingSearchId = yield this._checkIfSearchExists(searchId, searchParams);
    if (_.isString(existingSearchId)) {
        return this._getResults(existingSearchId);
    }

    // query yelp and save results
    const yelpResults = yield this._searchYelp(searchParams);
    yield this._saveResults(searchId, yelpResults);

    return this._getResults(searchId);
});

/**
 * Search from the smart version. It queries the web from various sources.
 *
 * @param  {Object} userInput
 * @param  {String} location
 * @return {Object} result
 */
SearchModel.prototype.smartSearch = co.wrap(function*(userInput, location) {
    const keywords = yield this._getKeywords(userInput);
    const frontendKeywords = _.includes(keywords, ',') ? keywords.split(',') : keywords;
    const searchParams = { term: keywords, location };

    // record search
    const searchId = uuid.v4();
    yield this._createSearch(searchId, searchParams, 'smart');

    // if this search has already been done, return results
    const existingSearchId = yield this._checkIfSearchExists(searchId, searchParams);
    if (_.isString(existingSearchId)) {
        const existingResults = yield this._getResults(existingSearchId);
        return {
            searchId: existingResults.searchId,
            results: existingResults.results.slice(0, 6), // display top 6 only
            keywords: frontendKeywords
        };
    }

    // query sources and save results
    const results = yield this._searchSources(searchParams);
    yield this._saveResults(searchId, results);

    const response = yield this._getResults(searchId);
    return {
        searchId: response.searchId,
        results: response.results.slice(0, 6), // display top 6 only
        keywords: frontendKeywords
    };
});

SearchModel.prototype.getItemDetails = co.wrap(function*(itemId) {
    // find item source name and id
    const sqlResponse = yield this.db('Results')
        .where('resultId', itemId)
        .select('sourceName', 'idInSource');

    if (_.isEmpty(sqlResponse)) {
        throw {
            code: 500,
            message: 'Internal server error'
        };
    }

    const sourceName = sqlResponse[0].sourceName;
    const idInSource = sqlResponse[0].idInSource;

    // get details from source
    let resultDetails = null;
    switch (sourceName) {
        case 'Yelp':
            resultDetails = yield this._getYelpBusinessDetails(idInSource);
            break;
        case 'Foursquare':
            resultDetails = yield this._getFoursquareVenueDetails(idInSource);
            break;
        case 'Zomato':
            // HACK. While I wait for zomato to give me partner access to photos and reviews
            // getZomatoRestaurantDetails only returns reviews. Construct the detailed product here.
            const reviews = yield this._getZomatoRestaurantDetails(idInSource);
            const item = yield this.db('Results').where('resultId', itemId);
            resultDetails = item[0];
            resultDetails.reviews = JSON.stringify({ data: reviews });
            break;
        default:
            throw {
                code: 400,
                message: 'Cannot find item details from its source'
            };
    }

    // save details in db
    yield this._updateResults(itemId, resultDetails);

    // return result details from db
    const dbResult = yield this.db('Results').where('resultId', itemId);
    return parseJsonColumns(dbResult[0]);
});

SearchModel.prototype.saveChoice = function(searchId, resultId) {
    return this.db('Searches')
        .where('searchId', searchId)
        .update({
            choice: resultId
        });
};

SearchModel.prototype.getAllSearches = function(version) {
    return this.db('Searches').where('version', version).count(version);
};

SearchModel.prototype.getChoiceSearches = co.wrap(function*(version) {
    const versionSearches = yield this.db('Searches').where('version', version);
    const count = _.reject(versionSearches, s => !_.isString(s.choice)).length;
    return String(count);
});

/* * * * * * * * * *
 *
 * Private Functions
 *
 * * * * * * * * * */

/**
 * Query sources
 * @param  {Object}  search
 * @return {Object} query
 */
SearchModel.prototype._searchSources = co.wrap(function*(searchParams) {
    const self = this;
    let sources = [
        '_searchYelp',
        '_searchFoursquare'
    ];

    // query Zomato only for food related queries
    const searchKeywords = searchParams.term.split(',');
    const foodLexicalField = [
        'restaurant',
        'dinner',
        'lunch',
        'breakfast',
        'brunch',
        'food',
        'munchies',
        'bytes',
        'eat'
    ];
    const isFood = !_.isEmpty(_.intersection(searchKeywords, foodLexicalField));
    if (isFood) {
        sources.push('_searchZomato');
    }

    const results = yield Promise.all(_.map(sources, s => self[s](searchParams)));

    let filtered = _.map(results, r => r.slice(0, 3));
    filtered = _.flatten(filtered);

    // TODO remove duplicates
    return filtered;
});

/**
 * Check if the results exist in DB for a search different than the current one
 * @param  {Object}  search
 * @return {Object} query
 */
SearchModel.prototype._checkIfSearchExists = co.wrap(function*(currentSearchId, searchParams) {
    const searches = yield this.db('Searches').where(searchParams).select('searchId');
    const otherSearches = _.filter(searches, s => s.searchId !== currentSearchId);
    // return the first other search or undefined if it doesn't exist
    if (!_.isEmpty(otherSearches)) {
        return otherSearches[0].searchId;
    } else {
        return {
            message: 'No search exists for the given params'
        };
    }
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
        creationTimestamp: Date.now()
    });
};

/**
 * Save results
 * @param  {Array}  results
 * @return {Object} query
 */
SearchModel.prototype._saveResults = function(searchId, results) {
    const resultsPromises = _.map(results, item => {
        return this.db('Results').insert(_.merge(item, {
            creationTimestamp: Date.now(),
            searchId
        }));
    });
    return Promise.all(resultsPromises);
};

/**
 * Extand result row with detailed information
 * @param  {Array}  results
 * @return {Object} query
 */
SearchModel.prototype._updateResults = function(resultId, resultDetails) {
    return this.db('Results')
        .where('resultId', resultId)
        // TODO: change when yelp uses pick in normalize
        .update(_.pick(resultDetails, [
            'categories',
            'coordinates',
            'reviews',
            'images'
        ]));
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
                results: _.map(response, parseJsonColumns)
            };
        });
};

/**
 * Get keywords from DB or Watson
 * @param  {String} userInput
 * @return {Promise}
 */
SearchModel.prototype._getKeywords = co.wrap(function*(userInput) {
    const dbQuery = yield this.db('Keywords').where('userInput', userInput).select('keyword');

    // if the keyword is in the db, return it
    if (!_.isEmpty(dbQuery)) {
        return _.map(dbQuery, q => q.keyword).toString();
    }

    // otherwise query Watson
    const watsonKeywords = yield this._getWatsonKeywords(userInput);
    // reject relevance < 0.6
    const accurateKeywords = _.chain(watsonKeywords)
        .reject(k => k.relevance < 0.6)
        .map(k => k.text)
        .value();

    // save keywords in db
    const keywordPromises = _.map(accurateKeywords, k => this._createKeyword(userInput, k));
    yield Promise.all(keywordPromises);

    return accurateKeywords.toString();
});

/**
 * Insert Watson results into DB
 * @param  {String} searchId
 * @return {Promise}
 */
SearchModel.prototype._createKeyword = function(userInput, keyword) {
    return this.db('Keywords').insert({
        keywordId: uuid.v4(),
        creationTimestamp: Date.now(),
        keyword,
        userInput
    });
};

function parseJsonColumns(result) {
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

SearchModel.prototype._searchFoursquare = function(query) {
    return this.$services.find('sFoursquare').post('/api/v1/foursquare', query)
        .then(response => {
            return response;
        });
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

SearchModel.prototype._searchZomato = function(query) {
    return this.$services.find('sZomato').get('/api/v1/zomato/search', { query });
};

SearchModel.prototype._getYelpBusinessDetails = function(yelpBusinessId) {
    return this.$services.find('sYelp').get(`/api/v1/yelp/details/${yelpBusinessId}`);
};

SearchModel.prototype._getFoursquareVenueDetails = function(foursquareVenueId) {
    return this.$services.find('sFoursquare').get(`/api/v1/foursquare/details/${foursquareVenueId}`);
};

SearchModel.prototype._getZomatoRestaurantDetails = function(zomatoRestaurantId) {
    return this.$services.find('sZomato').get(`/api/v1/zomato/details/${zomatoRestaurantId}`)
};
