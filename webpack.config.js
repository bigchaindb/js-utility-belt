/* eslint-disable strict, no-console, object-shorthand */
/* eslint-disable import/no-extraneous-dependencies, import/newline-after-import */
'use strict';

const path = require('path');

const webpack = require('webpack');

require('dotenv').load({ silent: true });

const PRODUCTION = process.env.NODE_ENV === 'production';

const PATHS = {
    ENTRY: path.resolve(__dirname, 'src/index.js'),
    BUNDLE: path.resolve(__dirname, 'bundle'),
    NODE_MODULES: path.resolve(__dirname, 'node_modules'),
};


/** EXTERNAL DEFINITIONS INJECTED INTO APP **/
const DEFINITIONS = {
    'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
    },
};


/** PLUGINS **/
const PLUGINS = [
    new webpack.DefinePlugin(DEFINITIONS),
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
        Promise: 'imports?this=>global!exports?global.Promise!es6-promise',
        fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),
];

const PROD_PLUGINS = [
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        },
        output: {
            comments: false
        },
        sourceMap: true
    }),
    new webpack.LoaderOptionsPlugin({
        debug: false,
        minimize: true
    }),
];

if (PRODUCTION) {
    PLUGINS.push(...PROD_PLUGINS);
}


/** EXPORTED WEBPACK CONFIG **/
const config = {
    entry: [PATHS.ENTRY],

    output: {
        filename: PRODUCTION ? 'bundle.min.js' : 'bundle.js',
        library: 'js-utility-belt',
        libraryTarget: 'umd',
        path: PATHS.BUNDLE,
    },

    debug: !PRODUCTION,

    devtool: PRODUCTION ? '#source-map' : '#inline-source-map',

    resolve: {
        extensions: ['', '.js', '.jsx'],
        modules: ['node_modules'], // Don't use absolute path here to allow recursive matching
    },

    plugins: PLUGINS,

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: [PATHS.NODE_MODULES],
                loader: 'babel',
                query: {
                    cacheDirectory: true
                }
            },
        ],
    },
};

module.exports = config;
