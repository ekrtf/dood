/**
 * @module ZomatoService
 * @type adapter
 * @description entry point of Zomato API calls
 */

const co = require('co');
const uuid = require('uuid');
const rp = require('request-promise');
const _ = require('lodash');

module.exports = ZomatoService;

/* * * * * * * * * *
 *
 * Constructor
 *
 * * * * * * * * * */

function ZomatoService($config) {
    this.sourceName = 'Zomato';
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
                    return _.map(res.restaurants, r =>
                        self._normalizeZomatoRestaurant(r.restaurant)
                    );
                })
                .catch(console.log);
        }

        return {
            code: 204,
            message: 'No content found'
        };
    });
};

ZomatoService.prototype.getZomatoRestaurantDetails = function(restaurantId) {
    const self = this;
    const options = {
        uri: 'https://developers.zomato.com/api/v2.1/reviews',
        headers: self.baseHeader,
        qs: { res_id: restaurantId },
        json: true
    };

    return rp(options)
        .then(function(res) {
            return self._normalizeZomatoReviews(res.user_reviews);
        })
        .catch(console.log);
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

ZomatoService.prototype._normalizeZomatoRestaurant = function(item) {
    let result = {};

    result.resultId = uuid.v4();
    result.name = item.name;
    result.idInSource = item.id;
    result.imageUrl = item.featured_image;
    result.sourceName = this.sourceName;
    result.rating = item.user_rating.aggregate_rating;
    result.price = Array(item.price_range).join(item.currency).toString() || 'NA';
    result.addressDisplay = item.location.address;
    result.addressLine = item.location.locality_verbose || 'Everywhere';
    result.coordinates = JSON.stringify({ data: {
        latitude: item.location.latitude,
        longitude: item.location.longitude
    }});

    const categories = item.cuisines.split(',');
    categories.unshift('Restaurant');
    result.categories = JSON.stringify({ data: categories });

    return result;
};

ZomatoService.prototype._normalizeZomatoReviews = function(reviews) {
    return _.map(reviews, r => ({
        author: r.review.user.name,
        text: r.review.review_text
    }));
};
