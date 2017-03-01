/**
 * @module YelpService
 * @type adapter
 * @description entry point of Yelp API calls
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
    this.accessHeader = null;
    this.tokenDeathDay = null;
}

/* * * * * * * * * *
 *
 * Initialization
 *
 * * * * * * * * * */

YelpService.prototype.$init = co.wrap(function*() {
    yield this._setAccessHeader();
});

/* * * * * * * * * *
 *
 * Public Functions
 *
 * * * * * * * * * */

YelpService.prototype.searchYelp = co.wrap(function*(location, term) {
    const options = {
        uri: 'https://api.yelp.com/v3/businesses/search',
        qs: { location, term },
        headers: this.accessHeader,
        json: true
    };

    yield this._checkAuthentication();

    return rp(options)
        .then(function(res) {
            return res.businesses;
        })
        .catch(console.log);
});

YelpService.prototype.getYelpBusinessDetails = co.wrap(function*(yelpBusinessId) {
    const options = {
        uri: `https://api.yelp.com/v3/businesses/${ yelpBusinessId }`,
        headers: this.accessHeader,
        json: true
    };

    yield this._checkAuthentication();

    const calls = yield Promise.all([
        rp(options),
        this.getYelpBusinessReviews(yelpBusinessId)
    ]);

    let result = _normalizeYelpResult(calls[0]);
    result.reviews = calls[1];
    return result;
});

YelpService.prototype.getYelpBusinessReviews = co.wrap(function*(yelpBusinessId) {
    const options = {
        uri: `https://api.yelp.com/v3/businesses/${ yelpBusinessId }/reviews`,
        headers: this.accessHeader,
        json: true
    };

    yield this._checkAuthentication();

    return rp(options)
        .then(function(res) {
            return res.reviews;
        })
        .catch(console.log);
});

/* * * * * * * * * *
 *
 * Private Functions
 *
 * * * * * * * * * */

YelpService.prototype._setAccessHeader = function() {
    const self = this;
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

    return rp(options)
        .then(function(res) {
            self.tokenDeathDay = Date.now() + (res.expires_in * 1000);
            self.accessHeader = {
                'Authorization': `Bearer ${ res.access_token }`,
                'User-Agent': 'DissertationProject'
            };
        })
        .catch(console.log);
};

YelpService.prototype._checkAuthentication = co.wrap(function*() {
    const lifeLeft = this.tokenDeathDay - Date.now();

    // renew access token if it has less than 24 hours to live
    if (lifeLeft < 86400000) {
        return this._setAccessHeader();
    }
    return Promise.resolve();
});

function _normalizeYelpResult(item) {
    item.resultId = uuid.v4();
    item.images = item.photos.map((src) => ({ src }));
    return item;
}
