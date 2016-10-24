#!/bin/env node

'use strict';

var webpack = require('webpack');
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpackHotMiddleware = require('webpack-hot-middleware');
var express = require('../../server/node_modules/express');
var webpackConfig = require('./webpack.config.js');

var PORT = 4001;
var OPTIONS = {
    contentBase: './src',
    hot: true,
    noInfo: true,
    headers: { 'X-Custom-Header': 'yes' },
    stats: { colors: true }
};

webpackConfig.entry = [
    'webpack-hot-middleware/client?http://localhost:' + PORT,
    'webpack/hot/only-dev-server',
    './src/index.jsx'
];

webpackConfig.plugins = [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
].concat(webpackConfig.plugins);

console.info('starting webpack compilation...');
var app = express();
var compiler = webpack(webpackConfig);
var webpackInstance = webpackDevMiddleware(compiler, OPTIONS);

app.use(webpackInstance);
app.use(webpackHotMiddleware(compiler));

webpackInstance.waitUntilValid(function() {
    app.listen(PORT, function(error) {
        if (error) {
            console.error(error);
            return;
        }

        console.info('----\n==> 🚧  Development server listening on port', PORT);
    });
});
