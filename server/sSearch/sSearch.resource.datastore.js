var _ = require('lodash');
var co = require('co');
var levenshtein = require('fast-levenshtein');

var config = require('../config.json');
var logger = null;

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
SearchStore.prototype.doSearch = function(search, location, filters) {
    var self = this;

    return co(function*() {
        self.translateUserToWeb(search, location);

        // var context = self.getContext(location);

        // var query = {
        //     location: location,
        //     radius: filters.radius || self._default.raduis,
        //     keywords: yield translateUserToWeb(search, location)
        // };
        //
        // var webResults = {
        //     yelp: yield self.searchYelp(query),
        //     places: yield self.searchPlaces(query)
        // };
        //
        // var rawResults = yield removeDuplicates(webResults);
        //
        // return yield doodifyResults(rawResults, context, filters);
    });
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
 * Remove duplicates form web searches
 * @return {Object} results
 */
function removeDuplicates(webResults) {
    var all = [];

    for (var source in webResults) {
        var item = webResults[source];
        all.push(item);
    }

    var results = _.cloneDeep(all);

    for (var i = 0; i < all.length; i++) {
        var item = all[i];
        var rest = all.splice(i, 1);

        for (var j = 0; j < rest.length; j++) {
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
    var lat = _.toString(location.lat);
    var lng = _.toString(location.lng);

    return this._services.find('sContext').get('/api/v1/context?lat=' + lat + '?lng=' + lng);
};

SearchStore.prototype.expandConcept = function(search, label) {
    var query = {
        search: search,
        label: label || null
    };

    return this._services.find('sWatson').post('/api/v1/watson/conceptExpansion', query);
};

SearchStore.prototype.languageAlchemy = function(search) {
    var query = {
        search: search
    };

    return this._services.find('sWatson').post('/api/v1/watson/languageAlchemy', query);
};

SearchStore.prototype.searchYelp = function(query) {
    return this._services.find('sYelpAdapter').post('/api/v1/yelp/query', query);
};

SearchStore.prototype.searchPlaces = function(query) {
    return this._services.find('sPlacesAdapter').post('/api/v1/places/query', query);
};
