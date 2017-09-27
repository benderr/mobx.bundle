const webpack = require('webpack');
const config = require('./webpack/constants');
const vendor = require('./webpack/vendors');
const plugins = require('./webpack/plugins');
const rules = require('./webpack/rules');
const devServer = require('./webpack/devServer');

const buildEntryPoint = (point) => {
	if (config.IS_PRODUCTION)
		return point;
	return [point, 'webpack/hot/only-dev-server', `webpack-dev-server/client?http://${config.app.host}:${config.app.port}`];
}

module.exports = {
	devtool: config.IS_PRODUCTION ? 'source-map' : 'eval-source-map',
	context: config.jsSourcePath,
	entry: {
		vendor: vendor,
		app: buildEntryPoint('./index'),
		signin: buildEntryPoint('./signin'),
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