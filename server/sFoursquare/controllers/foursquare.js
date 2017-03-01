'use strict';

const _ = require('lodash');

module.exports = FoursquareCtrl;

function FoursquareCtrl() {}

/* * * * * * * * * *
 *
 * Public functions
 *
 * * * * * * * * * */

FoursquareCtrl.prototype.searchFoursquare = function($input, $error, $done, $service) {
    const { destination, term } = $input.body;

    $service.searchFoursquare(destination, term)
        .then($done)
        .catch(function(e) {
            console.log(e);
            $error();
        });
};

FoursquareCtrl.prototype.getFoursquareCategories = function($input, $error, $done, $service) {
    console.log('hello')
    $service.getFoursquareCategories()
        .then($done)
        .catch(function(e) {
            console.log(e);
            $error();
        });
};
