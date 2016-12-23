'use strict';

/**
 * @module ServerApp
 * @description main server for dood app
 */

const _ = require('lodash');
const hyper = require('hyper.io');
const config = require('./config.json');

module.exports = ServerApp;

/* * * * * * * * * *
 *
 * Constructor
 *
 * * * * * * * * * */

function ServerApp() {
    this._name = config.name || 'server';
    this._options = {
        'env': process.env.ENV || config.env || 'prod',
        'appName': this._name,
        'port': process.env.PORT || config.ports.server || 8080
    };
    this._server = hyper(this._options);
}

/* * * * * * * * * *
 *
 * Public functions
 *
 * * * * * * * * * */

/**
 * Load microservices
 * @param {Array} list
 */
ServerApp.prototype.load = function(list) {
    const frontendService = {
        name: 'frontendService',
        routes: [{
            static: '../../frontend/dist'
        }]
    };
    list.unshift(frontendService);

    const preRouteService = {
        name: 'preRouteSetup',
        preRoutes: ($http) => {
            this.addCORS($http.app());
        }
    };
    list.unshift(preRouteService);

    return this._server.load(list);
};

/**
 * Start server
 * @param {Array} list  list of all mircoservices from server.app.js
 */
ServerApp.prototype.start = function(list) {
    return this._server.start();
};

/**
 * Add headers so client can connect to this service
 * @param {Object} app
 */
ServerApp.prototype.addCORS = function(app) {
    app.use(function(req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,x-access-token');
        res.setHeader('Access-Control-Allow-Credentials', true);
        next();
    });
};
