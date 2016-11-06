/**
 * @module WatsonService
 * @description entry point for IBM Watson calls
 */

var watson = require('watson-developer-cloud');
var co = require('co');
var fs = require('fs');
var path = require('path');

var config = require('../config.json');

var logger = null;

module.exports = WatsonService;

/* * * * * * * * * *
 *
 * Constructor
 *
 * * * * * * * * * */

function WatsonService($logger) {
    logger = $logger;

}

/* * * * * * * * * *
 *
 * Public functions
 *
 * * * * * * * * * */

WatsonService.prototype.conceptExpansion = function(search, label) {
    return co(function*() {
        var concept_expansion = watson.concept_expansion({
            username: config.apis.watson.credentials.username,
            password: config.apis.watson.credentials.password,
            version: 'v1-beta'
        });

        var params = {
            seeds: search,
            label: label || null
        };

        concept_expansion.expand(params, function (error, response) {
            if (error) {
                throw new Error('error:', error);
            }

            console.log(JSON.stringify(response, null, 4));

            // var content = JSON.stringify(response, null, 4);
            // var memoryPath = path.join(path.resolve(__dirname, '../memory/'), search[0] + '.js');
            //
            // fs.writeFile(memoryPath, content, function(err) {
            //     if (err) {
            //         return console.log(err);
            //     }
            //
            //     console.log("The file was saved!");
            // });


            if (response.out_of_vocabulary) {
                // TODO tell search that there are some unknow terms
            }

            // TODO filter prevalence

            return {};
        });
    });
};

WatsonService.prototype.languageAlchemy = function(search) {
    return co(function*() {
        var alchemy_language = watson.alchemy_language({
            api_key: config.apis.watson.credentials.apiKey
        });

        var params = {
            text: search
        };

        console.log(alchemy_language);

        alchemy_language.concepts(params, function (err, response) {
            if (err)
                console.log('error:', err);
            else
                console.log(JSON.stringify(response, null, 4));
        });

    });
};
