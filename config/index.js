const merge = require('webpack-merge');

module.exports = function (server) {
	return merge(
		require('./config.json'),
		require('./config.' + (server || 'dev') + '.json')
	);
};