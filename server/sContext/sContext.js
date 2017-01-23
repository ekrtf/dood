/**
 * @module ContextService
 * @description get context data: location, user, weather
 */

const _ = require('lodash');
const co = require('co');
const Forecast = require('forecast.io-bluebird');
const NodeGeocoder = require('node-geocoder');

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

ContextService.prototype.getWeather = function(position) {
    return this.forecast.fetch(position.lat, position.lng)
        .then((weather) => weather)
        .catch((error) => {
            throw new Error('Unable to find weather forecasts. Error: "' + error + '"');
        });
};

ContextService.prototype.isRaining = co.wrap(function*(position) {
    const weather = yield this.getWeather(location);
    return _.includes(_.snakeCase(weather.currently.summary), 'rain');
});
