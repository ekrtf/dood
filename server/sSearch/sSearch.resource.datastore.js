'use strict';

const _ = require('lodash');
const co = require('co');
const levenshtein = require('fast-levenshtein');

let config = require('../config.json');
let logger = null;

module.exports = SearchStore;

/* * * * * * * * * *
 *
 * Constructor
 *
 * * * * * * * * * */

function SearchStore($services, $logger) {
    logger = $logger;
    this._services = $services;
    this._default = {
        radius: 5000 // meters
    };
}

/* * * * * * * * * *
 *
 * Initialization
 *
 * * * * * * * * * */

SearchStore.prototype.$init = function() {
    logger.log('search API init');
};

/* * * * * * * * * *
 *
 * Public functions
 *
 * * * * * * * * * */

/**
 * Main search function
 * @param  {Object} search  user input search
 * @return {Object} result  user results
 */
SearchStore.prototype.doSearch = function(destination, fromDate, toDate) {
    return this.searchYelp(destination);
    // return co(function*() {
    //     self.translateUserToWeb(search, location);

    //     let context = self.getContext(location);

    //     let query = {
    //         location: location,
    //         radius: filters.radius || self._default.raduis,
    //         keywords: yield translateUserToWeb(search, location)
    //     };

    //     let webResults = {
    //         yelp: yield self.searchYelp(query),
    //         places: yield self.searchPlaces(query)
    //     };

    //     let rawResults = yield removeDuplicates(webResults);

    //     return yield doodifyResults(rawResults, context, filters);
    // });
};

SearchStore.prototype.getItemDetails = function(itemId) {
    return this.getYelpBusinessDetails(itemId);
};

/* * * * * * * * * *
 *
 * Helper functions
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
SearchStore.prototype.translateUserToWeb = function(search, location) {
    // this.expandConcept(search);
    this.languageAlchemy(search);

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
 * TODO: refactor this to use recursion
 * Remove duplicates form web searches
 * @return {Object} results
 */
function removeDuplicates(webResults) {
    let all = [];

    for (let source in webResults) {
        let item = webResults[source];
        all.push(item);
    }

    let results = _.cloneDeep(all);

    for (let i = 0; i < all.length; i++) {
        let item = all[i];
        let rest = all.splice(i, 1);

        for (let j = 0; j < rest.length; j++) {
            levenshtein.getAsync(item.name, rest[j].name, function (error, distance) {
                if (error) {
                    throw new Error('Unable to calculate levenshtein distance');
                }

                if (ditance > 3 && (item.type === rest[j].type)) {
                    _.remove(results, result => result.id === item.id);
                }
            });
        }
    }

    return results;
}

/**
 * Dood filters the results
 *
 * This is where the essense of Dood is conveyed.
 *
 * @param {Object} rawResults
 * @param {Object} context
 * @return {Object} doodResults
 */
function doodifyResults(rawResults, context, filters) {
    // TODO code the dood rules

    // 1. check is weather allow outdoors
    // 2. remove closed venues

    // 3. figure out if feelings match

    // 4. apply filters

}

/* * * * * * * * * *
 *
 * Calls to external services
 *
 * * * * * * * * * */

SearchStore.prototype.getContext = function(location) {
    const lat = _.toString(location.lat);
    const lng = _.toString(location.lng);
    return this._services.find('sContext').get('/api/v1/context?lat=' + lat + '?lng=' + lng);
};

SearchStore.prototype.expandConcept = function(search, label) {
    const query = { label, search };
    return this._services.find('sWatson').post('/api/v1/watson/conceptExpansion', query);
};

SearchStore.prototype.languageAlchemy = function(search) {
    let query = { search };
    return this._services.find('sWatson').post('/api/v1/watson/languageAlchemy', query);
};

SearchStore.prototype.searchYelp = function(location) {
    const query = { location };
    return this._services.find('sYelp').post('/api/v1/yelp/query', query);
};

SearchStore.prototype.getYelpBusinessDetails = function(yelpBusinessId) {
    return this._services.find('sYelp').get('/api/v1/yelp/details/' + yelpBusinessId);
};
