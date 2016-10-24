/**
 * @module ContextService
 * @description get context data: location, user, weather
 */

const _ = require('lodash');
const co = require('co');
const Forecast = require('forecast.io-bluebird');
const NodeGeocoder = require('node-geocoder');
const moment = require('moment');

module.exports = ContextService;

/* * * * * * * * * *
 *
 * Constructor
 *
 * * * * * * * * * */

function ContextService($config) {
    this.forecast = new Forecast({
        key: $config.forecast.key,
        timeout: 2500
    });
    this.geocoder = NodeGeocoder({
        provider: 'opencage',
        apiKey: $config.geocoder.key
    });
}

/* * * * * * * * * *
 *
 * Public Functions
 *
 * * * * * * * * * */

ContextService.prototype.reverseLocation = function(position) {
    return new Promise((resolve, reject) => {
        this.geocoder.reverse({ lat: position.lat, lon: position.lng }, function(err, res) {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

ContextService.prototype.getWeatherKeywords = co.wrap(function*(location) {
    let loc = null;
    if (_.isString(location)) {
        loc = yield this.reverseLocation(location);
    } else {
        loc = {
            lat: location.latitude,
            lng: location.longitude
        };
    }

    const weather = yield this._getWeather(loc);
    return [ weather.currently.summary ];
});

ContextService.prototype.getDateKeywords = function(date) {
    let words = [];

    const momentDate = moment(date);
    const day = momentDate.day();
    const monthDay = momentDate.date();
    const hour = momentDate.hour();

    // day of the week
    if (day === 5) {
        words.push('TGIF');
    } else if (day === 6 && hour > 20) {
        words.push('Saturday night fever');
    } else if (day === 7) {
        words.push('Sunday chill');
    }

    // day of the month
    if (monthDay > '27') {
        words.push('End of the month bankruptcy');
    }

    // time of the day
    if (hour >= 7 && hour < 12) {
        words.push('Morning');
    } else if (hour >= 12 && hour < 19) {
        words.push('Afternoon');
    } else if (hour >= 19 && hour < 22) {
        words.push('Evening');
    } else if (hour >= 22 && hour < 7) {
        words.push('Night');
    }

    // TODO: enhance

    return Promise.resolve(words);
};

ContextService.prototype.isRaining = co.wrap(function*(position) {
    const weather = yield this._getWeather(location);
    return _.includes(_.snakeCase(weather.currently.summary), 'rain');
});

/* * * * * * * * * *
 *
 * Private Functions
 *
 * * * * * * * * * */

ContextService.prototype._getWeather = function(position) {
    return this.forecast.fetch(position.lat, position.lng)
        .then((weather) => weather)
        .catch((error) => {
            throw new Error('Unable to find weather forecasts. Error: "' + error + '"');
        });
};
