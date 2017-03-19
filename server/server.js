'use strict';

/**
 * @module Server
 * @description main server for dood app
 */

const _ = require('lodash');
const hyper = require('hyper.io');
const config = require('./config.json');
const helmet = require('helmet');

module.exports = Server;

/* * * * * * * * * *
 *
 * Constructor
 *
 * * * * * * * * * */

function Server() {
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
Server.prototype.load = function(list) {
    const self = this;
    const preRouteService = {
        name: 'preRouteSetup',
        preRoutes: function($http) {
            const app = $http.app();
            const origin = self._options.env === 'dev' ?
                'http://localhost:4001' :
                'https://www.doodexperience.com';

            app.use(helmet());
            app.use(function(req, res, next) {
                res.setHeader('Access-Control-Allow-Origin', 'http://www.doodexperience.com');
                res.setHeader('Access-Control-Allow-Methods',
                    'GET, POST, PUT, DELETE');
                res.setHeader('Access-Control-Allow-Headers',
                    'X-Requested-With,content-type,x-access-token,Authorization');
                res.setHeader('Access-Control-Allow-Credentials', true);
                next();
            });
        }
    };
    list.unshift(preRouteService);

    return this._server.load(list);
};
