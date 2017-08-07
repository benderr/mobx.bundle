const webpack = require('webpack');
const config = require('../webpack/constants');
const appConfig = require('../config/config');
const path = require('path');
const autoprefixer = require('autoprefixer');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ChunkManifestPlugin = require("chunk-manifest-webpack-plugin");
const WebpackChunkHash = require('webpack-chunk-hash');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CommonsChunkPlugin = require("../node_modules/webpack/lib/optimize/CommonsChunkPlugin");

const plugins = [

	new WebpackChunkHash(),
	new CommonsChunkPlugin({
		name: ["vendors", "manifest", "app", "login"],
		minChunks: Infinity,
		filename: '[name]-[hash].js'
	}),
	new ChunkManifestPlugin({
		filename: "chunk-manifest.json",
		manifestVariable: "webpackManifest"
	}),
	new webpack.DefinePlugin({
		'process.env': {
			NODE_ENV: JSON.stringify(config.NODE_ENV),
		},
		__API_URL__: JSON.stringify(appConfig.apiConfig.apiUrl),
		__DEV__: true,
		__LOGGER__: false,
		__DEV_TOOLS__: false,
		__CLIENT__: true,
		__BASE_PATH__: '/'
	}),
	new HtmlWebpackPlugin({
		template: path.join(config.sourcePath, 'index.html'),
		path: config.buildPath,
		filename: 'index.html',
		chunks: ['vendors', 'manifest', "app"]
	}),
	new HtmlWebpackPlugin({
		template: path.join(config.sourcePath, 'login.html'),
		path: config.buildPath,
		filename: 'login.html',
		chunks: ['vendors', 'manifest', "login"]
	}),
	new webpack.LoaderOptionsPlugin({
		options: {
			postcss: [
				autoprefixer({
					browsers: [
						'last 3 version',
						'ie >= 10',
					],
				}),
			],
			stylus: {
				use: [require('nib')()],
				import: ['~nib/lib/nib/index.styl'],
				preferPathResolver: 'webpack',
			},
			context: config.sourcePath,
		}
	}),
	new OpenBrowserPlugin({url: appConfig.apiConfig.url})
];


if (config.IS_PRODUCTION) {
	// Production plugins
	plugins.push(
		new webpack.LoaderOptionsPlugin({
			minimize: true,
			debug: false,
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
				screw_ie8: true,
				conditionals: true,
				unused: true,
				comparisons: true,
				sequences: true,
				dead_code: true,
				evaluate: true,
				if_return: true,
				join_vars: true,
			},
			output: {
				comments: false,
			},
		}),
		new ExtractTextPlugin('[name]-[hash].css')
	);

	// Production rules
	// rules.push(
	//   {
	//     test: /\.scss$/,
	//     loader: ExtractTextPlugin.extract({
	//       fallback: 'style-loader',
	//       use: 'css-loader!postcss-loader!sass-loader',
	//     }),
	//   }
	// );
} else {
	// Development plugins
	plugins.push(
		new webpack.HotModuleReplacementPlugin(),
		new DashboardPlugin(),
		new webpack.NamedModulesPlugin()
	);
	//new ExtractTextPlugin('style-[hash].css')

	// Development rules
	// rules.push(
	//   {
	//     test: /\.scss$/,
	//     exclude: /node_modules/,
	//     use: [
	//       'style-loader',
	//       // Using source maps breaks urls in the CSS loader
	//       // https://github.com/webpack/css-loader/issues/232
	//       // This comment solves it, but breaks testing from a local network
	//       // https://github.com/webpack/css-loader/issues/232#issuecomment-240449998
	//       // 'css-loader?sourceMap',
	//       'css-loader',
	//       'postcss-loader',
	//       'sass-loader?sourceMap',
	//     ],
	//   }
	// );
}

module.exports = plugins;