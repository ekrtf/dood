'use strict';

/**
 * @module LocationUtility
 * @type utility
 * @description utility to handle location related logic
 */

const googlemaps = require('googlemaps');
const config = require('../config.json');

const GoogleMapsAPI = new GoogleMapsAPI({
    key: config.sPlaces.apiKey.key,
    stagger_time: 1000,
    encode_polylines: false,
    secure: true
});

/* * * * * * * * * *
 *
 * Exports
 *
 * * * * * * * * * */

module.exports = {
    getCoordiantes: getCoordiantes,
    getAddress: getAddress
};

/* * * * * * * * * *
 *
 * Functions
 *
 * * * * * * * * * */

/**
 * Return longitude and lattitude from a location address
 * @param  {String} address
 * @return {Object} location
 */
function getCoordiantes(address) {
    // TODO reverse geocoding
}

/**
 * Reverse geocoding: get street address from lattitude and longitude
 * @param  {Object} location
 * @return {Object} address
 */
function getAddress(location) {
    if (!location || !location.lat || !location.lng) {
        throw new Error('Location object empty or invalid');
    }

    const coordinates = new String(location.lat.toSting() + ',' + location.lng.toString());

    const params = {
        latlng: coordinates,
        result_type: 'formatted_address',
        language: 'en',
        location_type: 'ROOFTOP'
    };

    GoogleMapsAPI.reverseGeocode(params, function(error, result) {
        if (error) throw new Error(`Unable to reverse geocode:${ location }. Error: ${ error }`);
        return result;
    });
}
