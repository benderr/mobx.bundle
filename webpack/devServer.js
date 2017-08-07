const config = require('../webpack/constants');
const appConfig = require('../config/config');

const devServer = {
	contentBase: config.IS_PRODUCTION ? config.buildPath : config.sourcePath,
	historyApiFallback: true,
	port: 3000,
	compress: config.IS_PRODUCTION,
	inline: !config.IS_PRODUCTION,
	hot: !config.IS_PRODUCTION,
	host: appConfig.host,
	stats: {
		assets: true,
		children: false,
		chunks: false,
		hash: false,
		modules: false,
		publicPath: false,
		timings: true,
		version: false,
		warnings: true,
		colors: {
			green: '\u001b[32m',
		},
	},
	//disableHostCheck: true
}

module.exports = devServer;