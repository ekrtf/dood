/**
 * @module GooglePlacesService
 * @type adapter
 * @description entry point of Google Places API calls
 */

const co = require('co');
const rp = require('request-promise');
const _ = require('lodash');

module.exports = GooglePlacesService;

/* * * * * * * * * *
 *
 * Constructor
 *
 * * * * * * * * * */

function GooglePlacesService($config) {
    this.baseParams = {
        key: $config.apiKey
    };
}

/* * * * * * * * * *
 *
 * Initialization
 *
 * * * * * * * * * */

GooglePlacesService.prototype.$init = function() {

};

/* * * * * * * * * *
 *
 * Public Functions
 *
 * * * * * * * * * */

/**
 * Search the Zomato database for restaurants
 *
 * @param  {String} term - keyword
 * @return {Promise}
 */
GooglePlacesService.prototype.autoComplete = co.wrap(function*(term) {
    const googleResponse = yield rp({
        uri: 'https://maps.googleapis.com/maps/api/place/autocomplete/json',
        qs: _.merge(this.baseParams, {
            input: term
        }),
        json: true
    });

    if (googleResponse.status === 'OK') {
        return _.map(googleResponse.predictions, p => p.description);
    } else {
        throw {
            code: 404,
            message: 'Location prediction not found'
        };
    }
});
