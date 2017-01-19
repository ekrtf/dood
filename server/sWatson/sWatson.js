/**
 * @module WatsonService
 * @description entry point for IBM Watson calls
 */

const AlchemyLanguageV1 = require('watson-developer-cloud/alchemy-language/v1');
const _ = require('lodash');

module.exports = WatsonService;

/* * * * * * * * * *
 *
 * Constructor
 *
 * * * * * * * * * */

function WatsonService($config) {
    this.alchemy_language = new AlchemyLanguageV1({
      api_key: $config.credentials.apiKey
    });
}

/* * * * * * * * * *
 *
 * Public functions
 *
 * * * * * * * * * */

WatsonService.prototype.concepts = function(search) {
    return this._alchemyAsPromised('concepts', { text: search });
};

WatsonService.prototype.keywords = function(search) {
    return this._alchemyAsPromised('keywords', { text: search });
};

WatsonService.prototype.emotion = function(search) {
    return this._alchemyAsPromised('emotion', { text: search })
        .then((response) => {
            return _.chain(response.docEmotions)
                .map((score, emotion) => ({ emotion, score }))
                .filter(item => item.score > 0.75);
        });
};

/* * * * * * * * * *
 *
 * Private functions
 *
 * * * * * * * * * */

WatsonService.prototype._alchemyAsPromised = function(func, params) {
    return new Promise((resolve, reject) => {
        this.alchemy_language[func](params, function (err, response) {
            if (err) {
                reject(err);
            } else {
                resolve(response);
            }
        });
    });
};
