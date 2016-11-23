/**
 * @module YelpService
 * @type adapter
 * @description entry point of yelp API calls
 */

const co = require('co');
const uuid = require('uuid');
const rp = require('request-promise');

module.exports = YelpService;

/* * * * * * * * * *
 *
 * Constructor
 *
 * * * * * * * * * */

function YelpService($config) {
    this.config = $config;
    this.accessToken = null;
}

/* * * * * * * * * *
 *
 * Initialization
 *
 * * * * * * * * * */

YelpService.prototype.$init = co.wrap(function*() {
    // TODO: account for when the access token is expired
    const auth = yield this._getAccessToken();
    this.baseHeader = {
        'Authorization': `Bearer ${ auth.access_token }`,
        'User-Agent': 'DissertationProject'
    };
});

/* * * * * * * * * *
 *
 * Public Functions
 *
 * * * * * * * * * */

YelpService.prototype.searchYelp = function(location, term) {
    // HACK
    if (!location) {
        location = 'Paris';
    }

    const options = {
        uri: 'https://api.yelp.com/v3/businesses/search',
        qs: {
            location,
            term: 'hotel'
        },
        headers: this.baseHeader,
        json: true
    };

    return rp(options)
        .then(function(results) {
            return results.businesses;
        })
        .catch(console.log);
};

YelpService.prototype.getYelpBusinessDetails = co.wrap(function*(yelpBusinessId) {
    const options = {
        uri: `https://api.yelp.com/v3/businesses/${ yelpBusinessId }`,
        headers: this.baseHeader,
        json: true
    };

    const calls = yield Promise.all([
        rp(options),
        this.getYelpBusinessReviews(yelpBusinessId)
    ]);

    let result = _normalizeYelpResult(calls[0]);
    result.reviews = calls[1];
    return result;
});

YelpService.prototype.getYelpBusinessReviews = function(yelpBusinessId) {
    const options = {
        uri: `https://api.yelp.com/v3/businesses/${ yelpBusinessId }/reviews`,
        headers: this.baseHeader,
        json: true
    };
    return rp(options)
        .then(function(response) {
            return response.reviews;
        })
        .catch(console.log);
};

/* * * * * * * * * *
 *
 * Private Functions
 *
 * * * * * * * * * */

YelpService.prototype._getAccessToken = function() {
    const options = {
        method: 'POST',
        uri: 'https://api.yelp.com/oauth2/token',
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        form: {
            'grant_type': 'client_credentials',
            'client_id': this.config.appId,
            'client_secret': this.config.appSecret
        },
        json: true
    };

    return rp(options).catch(console.log);
};

function _normalizeYelpResult(item) {
    item.resultId = uuid.v4();
    item.images = item.photos.map((src) => ({ src }));
    return item;
}
