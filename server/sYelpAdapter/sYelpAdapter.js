/**
 * @module YelpAdapterService
 * @type adapter
 * @description entry point of yelp API calls
 */

var Yelp = require('yelp');
var config = require('../config.json');

var yelp = null;
var logger = null;

module.exports = YelpAdapterService;

/* * * * * * * * * *
 *
 * Constructor
 *
 * * * * * * * * * */

function YelpAdapterService($logger) {
    logger = $logger;
    yelp = new Yelp({
        consumer_key: config.apis.yelp.consumer_key,
        consumer_secret: config.apis.yelp.consumer_secret,
        token: config.apis.yelp.toker,
        token_secret: config.apis.yelp.token_secret
    });
}

/* * * * * * * * * *
 *
 * Public functions
 *
 * * * * * * * * * */

YelpAdapterService.prototype.searchYelp = function(query) {
    var terms;
    var categories;
    var location;

    var search = {
        term: terms,
        cll: location.lat.toString() + ',' + location.lng.toString()
    };

    yelp.search(search).then(function(data) {
        return data;
    });
};
