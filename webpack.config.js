const webpack = require('webpack');
const config = require('./webpack/constants');
const plugins = require('./webpack/plugins');
const rules = require('./webpack/rules');
const devServer = require('./webpack/devServer');

module.exports = {
	devtool: config.IS_PRODUCTION ? 'source-map' : 'eval-source-map',
	context: config.jsSourcePath,
	entry: {
		app: './index.js',
		login: './login.js',
		vendors: [
			'babel-polyfill',
			'es6-promise',
			'immutable',
			'react-dom',
			'react-redux',
			'react-router',
			'react-router-dom',
			'react',
			'redux-thunk',
			'redux',
			'axios',
			'accounting',
			'connected-react-router',
			'jquery-datetimepicker',
			'node-uuid',
			'normalizr',
			'path-to-regexp',
			'prop-types',
			'q',
			'react-click-outside',
			'react-dnd',
			'react-dnd-html5-backend',
			'react-modal',
			'react-notification-system',
			'react-select',
			'react-tooltip',
			'react-waypoint',
			'redux-immutablejs',
			'redux-saga',
			'redux-saga-debounce-effect',
			'reselect',
			'tether-drop',
			'redux-form/immutable',
			'connected-react-router/immutable',
			'jquery',
			'jquery-datetimepicker/build/jquery.datetimepicker.full'
		],
	},
	output: {
		path: config.buildPath,
		publicPath: '/',
		filename: '[name]-[hash].js',
	},
	module: {
		rules: rules,
	},
	resolve: {
		extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx', '.svg', '.ttf', '.woff', '.woff2'],
		modules: [
			config.nodeModules,
			config.jsSourcePath,
		],
	},
	plugins: plugins,
	devServer: devServer
};