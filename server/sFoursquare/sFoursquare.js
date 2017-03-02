/**
 * @module FoursquareService
 * @type adapter
 * @description entry point of Foursquare API calls
 */

const rp = require('request-promise');
const _ = require('lodash');

module.exports = FoursquareService;

/* * * * * * * * * *
 *
 * Constructor
 *
 * * * * * * * * * */

function FoursquareService($config) {
    this.baseQuery = {
        client_id: $config.clientId,
        client_secret: $config.clientSecret,
        m: 'foursquare',
        v: '20170301'
    };
}

/* * * * * * * * * *
 *
 * Initialization
 *
 * * * * * * * * * */

FoursquareService.prototype.$init = function() {

};

/* * * * * * * * * *
 *
 * Public Functions
 *
 * * * * * * * * * */

FoursquareService.prototype.searchFoursquare = function(location, term) {
    const options = {
        uri: 'https://api.foursquare.com/v2/venues/search',
        qs: { location, term },
        json: true
    };

    return rp(options)
        .then(function(results) {
            return results;
        })
        .catch(console.log);
};

FoursquareService.prototype.getFoursquareCategories = function() {
    const options = {
        uri: 'https://api.foursquare.com/v2/venues/categories',
        qs: this.baseQuery,
        json: true
    };

    return rp(options)
        .then(function(res) {
            return _.map(res.response.categories, c => c.name);
        })
        .catch(console.log);
};
