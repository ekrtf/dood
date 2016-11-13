/**
 * @module YelpService
 * @type adapter
 * @description entry point of yelp API calls
 */

const co = require('co');
const rp = require('request-promise');

module.exports = YelpService;

/* * * * * * * * * *
 *
 * Constructor
 *
 * * * * * * * * * */

function YelpService($config) {
    this.config = $config;
    this.accessToken = null;
}

/* * * * * * * * * *
 *
 * Initialization
 *
 * * * * * * * * * */

YelpService.prototype.$init = co.wrap(function*() {
    this.auth = yield this._getAccessToken();
    this.accessToken = this.auth.access_token;
});

/* * * * * * * * * *
 *
 * Public Functions
 *
 * * * * * * * * * */

YelpService.prototype.searchYelp = function(query) {
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

/* * * * * * * * * *
 *
 * Private Functions
 *
 * * * * * * * * * */

YelpService.prototype._getAccessToken = function() {
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
        }
    };

    return rp(options).catch(console.log);
};
