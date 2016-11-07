/**
 * @module WatsonService
 * @description entry point for IBM Watson calls
 */

const watson = require('watson-developer-cloud');
const fs = require('fs');
const path = require('path');
const config = require('../config.json');

let logger = null;

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
    const concept_expansion = watson.concept_expansion({
        username: config.apis.watson.credentials.username,
        password: config.apis.watson.credentials.password,
        version: 'v1-beta'
    });

    const params = {
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
};

WatsonService.prototype.languageAlchemy = function(search) {
    const alchemy_language = watson.alchemy_language({
        api_key: config.apis.watson.credentials.apiKey
    });

    const params = {
        text: search
    };

    console.log(alchemy_language);

    alchemy_language.concepts(params, function (err, response) {
        if (err)
            console.log('error:', err);
        else
            console.log(JSON.stringify(response, null, 4));
    });
};
