const webpack = require('webpack');

let webpackConfig = {
    entry: [
        './src/index.jsx'
    ],
    module: {
        preLoaders: [{
            test: /\.js$/,
            loader: 'jshint',
            exclude: /node_modules/,
            include: /src/
        }, {
            test: /\.jsx?$/,
            loader: 'eslint',
            exclude: /node_modules/,
            include: /src/
        }],
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loaders: ['react-hot', 'babel']
        }, {
            test: /\.s?css$/,
            exclude: /node_modules/,
            loaders: ['style', 'css', 'sass']
        }, {
            test: /\.(html|otf)$/,
            exclude: /node_modules/,
            loader: 'file?name=[name].[ext]'
        }, {
            test: /\.(jpg|png)$/,
            loader: 'file?name=[path][name].[ext]'
        }, {
            test: /\.json$/,
            loader: 'json-loader'
        }, {
            test: /\.svg$/,
            loader: 'svg-url-loader'
        }]
    },
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'bundle.js'
    },
    jshint: {
        esversion: 6
    },
    eslint: {
        parserOptions: {
            ecmaVersion: 6,
            sourceType: 'module',
            ecmaFeatures: {
                jsx: true
            }
        },
        plugins: [
            'react'
        ],
        extends: [
            'eslint:recommended',
            'plugin:react/recommended'
        ],
        settings: {
            react: {
                pragma: 'React',
                version: '15.0.1'
            }
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            '__ENV__': JSON.stringify(process.env.ENV || 'dev')
        })
    ]
};

if (process.env.ENV !== 'prod') {
    webpackConfig.devtool = 'source-map';
}

module.exports = webpackConfig;
