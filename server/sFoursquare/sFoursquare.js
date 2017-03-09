/**
 * @module FoursquareService
 * @type adapter
 * @description entry point of Foursquare API calls
 */

const rp = require('request-promise');
const co = require('co');
const uuid = require('uuid');
const _ = require('lodash');

module.exports = FoursquareService;

/* * * * * * * * * *
 *
 * Constructor
 *
 * * * * * * * * * */

function FoursquareService($config) {
    this.sourceName = 'Foursquare';
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

FoursquareService.prototype.searchFoursquare = co.wrap(function*(location, term) {
    const foursquareResponse = yield rp({
        uri: 'https://api.foursquare.com/v2/venues/search',
        qs: _.merge(this.baseQuery, {
            near: location,
            query: term
        }),
        json: true
    });


    const venues = _.map(foursquareResponse.response.venues, venue => {
        return this._normalizeFoursquareResult(venue);
    });

    for (let i = 0; i < venues.length; i++) {
        const venue = venues[i];
        if (venue.imageUrl) continue;
        venue.imageUrl = yield this._getFoursquareImageUrl(venue.idInSource);
    }

    return venues;
});

FoursquareService.prototype.getFoursquareVenueDetails = co.wrap(function*(venueId) {
    const response = yield rp({
        uri: `https://api.foursquare.com/v2/venues/${venueId}`,
        qs: this.baseQuery,
        json: true
    });

    if (response.meta.code === 200) {
        return this._normalizeFoursquareResult(response.response.venue);
    } else {
        throw {
            code: 400,
            message: 'Cannot get Foursquare venue details.'
        };
    }
});

FoursquareService.prototype.getFoursquareCategories = function() {
    return rp({
        uri: 'https://api.foursquare.com/v2/venues/categories',
        qs: this.baseQuery,
        json: true
    }).then(res => {
        return _.map(res.response.categories, c => c.name);
    });
};

/* * * * * * * * * *
 *
 * Private Functions
 *
 * * * * * * * * * */

FoursquareService.prototype._getFoursquareImageUrl = function(foursquareVenueId) {
    return rp({
        uri: `https://api.foursquare.com/v2/venues/${foursquareVenueId}/photos`,
        qs: _.merge(this.baseQuery, {
            limit: 1
        }),
        json: true
    }).then(res => {
        const photoObj = _.get(res, '.response.photos.items[0]');
        if (photoObj) {
            return photoObj.prefix + '300x300/' + photoObj.suffix.split('/')[1];
        } else {
            return 'http://il8.picdn.net/shutterstock/videos/7476982/thumb/1.jpg';
        }
    });
};

FoursquareService.prototype._getFoursquareTips = function(foursquareVenueId) {
    return rp({
        uri: `https://api.foursquare.com/v2/venues/${foursquareVenueId}/tips`,
        qs: this.baseQuery,
        json: true
    });
};

FoursquareService.prototype._normalizeFoursquareResult = function(item) {
    let result = {};
    result.resultId = uuid.v4();
    result.name = item.name;
    result.idInSource = item.id;
    result.sourceName = this.sourceName;
    result.categories = JSON.stringify({ data: _.map(item.categories, c => c.name) });
    result.addressLine = item.location.crossStreet || 'Everywhere';
    result.addressDisplay = `${item.location.crossStreet}, ${item.location.city}, ${item.location.country}`;
    result.coordinates = JSON.stringify({ data: {
        latitude: item.location.lat,
        longitude: item.location.lng
    }});

    if (item.price) {
        result.price = Array(item.price.tier).join(item.price.currency).toString();
    } else {
        result.price = 'NA';
    }

    if (item.rating) {
        // foursquare rates out of 10
        result.rating = item.rating / 2;
    } else {
        result.rating = 0; // TODO: unavailable rating case
    }

    if (item.bestPhoto) {
        result.imageUrl = item.bestPhoto.prefix + item.bestPhoto.suffix.split('/')[1]
    }

    if (item.photos) {
        const rawPhotos = _.get(item.photos, '.groups[0].items');
        if (rawPhotos.length) {
            result.images = JSON.stringify({
                data: _.map(rawPhotos, p => ({
                    src: p.prefix + '300x300/' + p.suffix.split('/')[1]
                }))
            });
        }
    }

    if (item.description) {
        result.description = item.description;
    }

    if (item.tips && !_.isEmpty(item.tips.groups)) {
        // foursquare clusters tips per user type: friends, folowing, self and others
        const tips = _.find(item.tips.groups, { type: 'others' });
        if (!_.isEmpty(tips.items)) {
            result.reviews = JSON.stringify({
                data: _.map(tips.items, t => ({
                    text: t.text,
                    author: t.user.firstName
                }))
            });
        }
    }

    return result;
};
