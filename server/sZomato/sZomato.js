/**
 * @module ZomatoService
 * @type adapter
 * @description entry point of Zomato API calls
 */

const co = require('co');
const rp = require('request-promise');
const _ = require('lodash');

module.exports = ZomatoService;

/* * * * * * * * * *
 *
 * Constructor
 *
 * * * * * * * * * */

function ZomatoService($config) {
    this.baseHeader = {
        'user-key': $config.apiKey
    };
}

/* * * * * * * * * *
 *
 * Initialization
 *
 * * * * * * * * * */

ZomatoService.prototype.$init = function() {

};

/* * * * * * * * * *
 *
 * Public Functions
 *
 * * * * * * * * * */

/**
 * Search the Zomato database for restaurants
 *
 * @param  {String} location - city name
 * @param  {String} term - keyword
 * @return {Promise}
 */
ZomatoService.prototype.searchZomato = function(location, term) {
    const self = this;

    return co(function*() {
        // check if that city is supported by Zomato
        const cityId = yield self._getZomatoCityId(location);

        if (cityId) {
            const options = {
                uri: 'https://developers.zomato.com/api/v2.1/search',
                headers: self.baseHeader,
                qs: {
                    entity_type: 'city',
                    sort: 'rating',
                    order: 'desc',
                    entity_id: cityId,
                    q: term
                },
                json: true
            };

            return rp(options)
                .then(function(res) {
                    return res.restaurants;
                })
                .catch(console.log);
        }

        return {
            code: 204,
            message: 'No content found'
        };
    });
};

/* * * * * * * * * *
 *
 * Private Functions
 *
 * * * * * * * * * */

/**
 * Zomato search requires a specific internal id to search in
 * a city. 
 *
 * @param  {String}  Name of the city to search
 * @return {Promise} City unique id from Zomato
 */
ZomatoService.prototype._getZomatoCityId = function(cityName) {
    const options = {
        uri: 'https://developers.zomato.com/api/v2.1/cities',
        headers: this.baseHeader,
        qs: {
            q: cityName,
            count: 1
        },
        json: true
    };

    return rp(options)
        .then(function(res) {
            if (res.location_suggestions.length) {
                return _.first(res.location_suggestions).id;
            }
            return false;
        })
        .catch(console.log);
};

