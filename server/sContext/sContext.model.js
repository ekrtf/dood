'use strict';

const _        = require('lodash');
const co       = require('co');
const moment   = require('moment-timezone');
const Forecast = require('forecast.io-bluebird');
const faker    = require('faker');
const config = require('../config.json');

let logger   = null;
let forecast = null;

module.exports = ContextStore;

/* * * * * * * * * *
 *
 * Constructor
 *
 * * * * * * * * * */

function ContextStore($services, $logger) {
    logger = $logger;
    this._services = $services;

    forecast = new Forecast({
        key: config.apis.forecast.key,
        timeout: 2500
    });
}

/* * * * * * * * * *
 *
 * Initialization
 *
 * * * * * * * * * */

ContextStore.prototype.$init = function() {

};

/* * * * * * * * * *
 *
 * Public functions
 *
 * * * * * * * * * */

/**
 * Get user context
 * @return {Object} context
 */
ContextStore.prototype.getContext = co.wrap(function*(location) {
    const self = this;

    const context = {
        time: null,
        location: location,
        disableOutdoors: null
    };

    context.time = moment().format('HH:mm'); // TODO timezoned from location
    context.disableOutdoors = yield self.disableOutdoors(location);

    return context;
});

/**
 * Check weather at client location to disable outdoor activities
 * @param  {Object} location (with lat and lng)
 * @return {Boolean} disableOutdoors
 */
ContextStore.prototype.disableOutdoors = function(location) {
    return co(function*() {
        const weather = yield getWeather(location);
        return _.includes(_.snakeCase(weather.currently.summary), 'rain');
    });
};

/* * * * * * * * * *
 *
 * Helper functions
 *
 * * * * * * * * * */

/**
 * Get forcasts.io weather
 * @param  {Object} location  with lat and lng
 * @return {Object} weather at location
 */
function getWeather(location) {
    return forecast.fetch(location.lat, location.lng)
        .then((weather) => weather)
        .catch((error) => {
            throw new Error('Unable to find weather forecasts. Error: "' + error + '"');
        });
}