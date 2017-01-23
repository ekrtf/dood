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
 * Main search function
 * @param  {Object} search  user input search
 * @return {Object} result  user results
 */
SearchModel.prototype.doSearch = function(destination, term) {
    const self = this;
    return co(function*() {
        const searchId = uuid.v4();

        // fetch results from the web
        const yelpResults = yield self._searchYelp(destination, term);
        if (!_.isArray(yelpResults)) {
            throw new Error(`Failed to fetch Yelp results`);
        }

        // save results to Results table
        const resultsPromises = yelpResults.map((item, index) => {
            return self.db('Results').insert({
                resultId: item.resultId,
                searchId: searchId,
                source: 'Yelp',
                model: item,
                createdAt: Date.now()
            });
        });
        yield Promise.all(resultsPromises);

        // save search to Search table
        yield self.db('Searches').insert({
            searchId: searchId,
            params: { destination, term },
            results: yelpResults.map(r => r.resultId),
            createdAt: Date.now()
        });

        return yelpResults;
    });
};

SearchModel.prototype.getItemDetails = function(itemId) {
    return this._getYelpBusinessDetails(itemId);
};

SearchModel.prototype.smartSearch = co.wrap(function*(userInput, location) {
    const keywords = yield this._getKeywords(userInput);
    return this._searchYelp(location, keywords[0].text);
});

/* * * * * * * * * *
 *
 * Helper Functions
 *
 * * * * * * * * * */

/**
 * The aim here is to translate whatever the user types
 * in the search bar into a meaninful search query for the web.
 *
 * Users write in English and make mistakes. The web needs structured queries.
 *
 * @param  {Array}  search  Words typed by the user
 * @return {Object} query   API payload
 */
SearchModel.prototype.translateUserToWeb = function(search, location) {
    // this.expandConcept(search);
    // this.languageAlchemy(search);

    // TODO THE HARD PART

    // get rid of any articles and determiants
    // get rid of words like 'really', 'like', 'best', 'awesome'
    // look for the most used synonym of each keyword
    //      - https://www.npmjs.com/package/thesaurus
    // recognize locations
    // recognize magic words like 'munchies'
    // recognize types
    //      - map human types with dood types

    // Hypothesis: make asumptions about what the user wants here,
    // verify it in doodResults(), restart the search with different
    // asumptions if nothing found

};

/**
 * Dood filters the results
 *
 * This is where the essense of Dood is conveyed.
 *
 * @param {Object} rawResults
 * @param {Object} context
 * @return {Object} doodResults
 */
SearchModel.prototype.doodifyResults = function(rawResults, context, filters) {
    // TODO code the dood rules

    // 1. check is weather allow outdoors
    // 2. remove closed venues

    // 3. figure out if feelings match

    // 4. apply filters
};

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

SearchModel.prototype._searchYelp = function(location, term) {
    const query = { location, term };
    return this.$services.find('sYelp').post('/api/v1/yelp/query', query);
};

SearchModel.prototype._getYelpBusinessDetails = function(yelpBusinessId) {
    return this.$services.find('sYelp').get('/api/v1/yelp/details/' + yelpBusinessId);
};
