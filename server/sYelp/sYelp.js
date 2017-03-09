/**
 * @module YelpService
 * @type adapter
 * @description entry point of Yelp API calls
 */

const co = require('co');
const uuid = require('uuid');
const rp = require('request-promise');
const _ = require('lodash');

module.exports = YelpService;

/* * * * * * * * * *
 *
 * Constructor
 *
 * * * * * * * * * */

function YelpService($config) {
    this.config = $config;
    this.sourceName = 'Yelp';
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
    yield this._checkAuthentication();

    const yelpResponse = yield rp({
        method: 'GET',
        uri: 'https://api.yelp.com/v3/businesses/search',
        qs: { location, term },
        headers: this.accessHeader,
        json: true
    });

    return _.map(yelpResponse.businesses, biz => this._normalizeYelpResult(biz));
});

YelpService.prototype.getYelpBusinessDetails = co.wrap(function*(yelpBusinessId) {
    yield this._checkAuthentication();

    const options = {
        method: 'GET',
        uri: `https://api.yelp.com/v3/businesses/${ yelpBusinessId }`,
        headers: this.accessHeader,
        json: true
    };
    const calls = yield Promise.all([
        rp(options),
        this.getYelpBusinessReviews(yelpBusinessId)
    ]);

    let result = this._normalizeYelpResult(calls[0]);
    result.reviews = JSON.stringify({ data: calls[1] });
    return result;
});

YelpService.prototype.getYelpBusinessReviews = co.wrap(function*(yelpBusinessId) {
    yield this._checkAuthentication();

    const yelpResponse = yield rp({
        method: 'GET',
        uri: `https://api.yelp.com/v3/businesses/${ yelpBusinessId }/reviews`,
        headers: this.accessHeader,
        json: true
    });

    return this._normalizeYelpReviews(yelpResponse.reviews);
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

YelpService.prototype._normalizeYelpResult = function(item) {
    let result = _.pick(item, [
        'name',
        'rating'
    ]);

    result.resultId = uuid.v4();
    result.idInSource = item.id;
    result.imageUrl = item.image_url;
    result.sourceName = this.sourceName;
    result.categories = JSON.stringify({ data: _.map(item.categories, c => c.title) });
    result.addressLine = item.location.address1;
    result.addressDisplay = `${item.location.address1}, ${item.location.city}, ${item.location.country}`;
    result.price = item.price || 'NA';

    if (item.coordinates) {
        result.coordinates = JSON.stringify({ data: item.coordinates });
    }
    if (item.photos) {
        result.images = JSON.stringify({ data: _.map(item.photos, src => ({ src })) });
    }
    return result;
};

YelpService.prototype._normalizeYelpReviews = function(reviews) {
    return _.map(reviews, review => ({
        url: review.url,
        author: review.user.name,
        text: review.text
    }));
};
