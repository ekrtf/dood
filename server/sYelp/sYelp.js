/**
 * @module YelpAdapterService
 * @type adapter
 * @description entry point of yelp API calls
 */

const Yelp = require('yelp');
const config = require('../config.json');

let yelp = null;
let logger = null;

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
    let terms;
    let categories;
    let location;

    let search = {
        term: terms,
        cll: location.lat.toString() + ',' + location.lng.toString()
    };

    yelp.search(search).then(function(data) {
        return data;
    });
};
