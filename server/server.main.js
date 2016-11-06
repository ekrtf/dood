'use strict';

/**
 * @module ServerMain
 * @description main server for ml-in-tourism app
 */

var _ = require('lodash');
var hyper = require('hyper.io');

var config = require('./config.json');

module.exports = ServerMain;

/* * * * * * * * * *
 *
 * Constructor
 *
 * * * * * * * * * */

function ServerMain() {
    this._hyperServer = null;
    this._options = {};
}

/* * * * * * * * * *
 *
 * Public functions
 *
 * * * * * * * * * */

/**
 * Initialize server
 * @return {Object}
 */
ServerMain.prototype.init = function() {
    this._name = config.name || 'server';
    this._options = {
        'env': process.env.ENV || config.env || 'prod',
        'appName': this._name,
        'port': process.env.PORT || config.ports.server || 8080
    };
    this._hyperServer = hyper(this._options);
    return this._hyperServer;
};

/**
 * Load microservices
 * @param {Array} list  list of all mircoservices from server.app.js
 */
ServerMain.prototype.load = function(list) {
    var self = this;

    var preRouteService = {
        name: 'preRouteSetup',
        preRoutes: function($logger, $http) {
            self._addCORS($http.app());
        }
    };

    list.unshift(preRouteService);

    return this._hyperServer.load(list);
};

/**
 * Start server
 * @param {Array} list  list of all mircoservices from server.app.js
 */
ServerMain.prototype.start = function(list) {
    return this.load(list).then(function(hyper) {
        return hyper.start();
    });
};

/**
 * Add headers so client can connect to this service
 * @param {Object} app
 */
ServerMain.prototype._addCORS = function(app) {
    app.use(function(req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,x-access-token');
        res.setHeader('Access-Control-Allow-Credentials', true);
        next();
    });
};
