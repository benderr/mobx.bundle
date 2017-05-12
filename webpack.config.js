const webpack = require('webpack');
const path = require('path');
const config = require('./config/config');

const DashboardPlugin = require('webpack-dashboard/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var ChunkManifestPlugin = require("chunk-manifest-webpack-plugin");
var WebpackChunkHash = require('webpack-chunk-hash');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

const autoprefixer = require('autoprefixer');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProduction = nodeEnv === 'production';

const jsSourcePath = path.join(__dirname, './source/js');
const buildPath = path.join(__dirname, './build');
const imgPath = path.join(__dirname, './source/markup/images');
const sourcePath = path.join(__dirname, './source');

const paths = {
	markupPath: path.join(__dirname, './source/markup')
};

// Common plugins
const plugins = [

	new WebpackChunkHash(),
	new webpack.optimize.CommonsChunkPlugin({
		name: ["vendor", "manifest"],
		minChunks: Infinity,
		filename: '[name]-[hash].js'
	}),
	new ChunkManifestPlugin({
		filename: "chunk-manifest.json",
		manifestVariable: "webpackManifest"
	}),
	new webpack.DefinePlugin({
		'process.env': {
			NODE_ENV: JSON.stringify(nodeEnv),
		},
		__API_URL__: JSON.stringify(config.apiConfig.apiUrl),
		__DEV__: true,
		__LOGGER__: false,
		__DEV_TOOLS__: false,
		__CLIENT__: true,
		__BASE_PATH__: '/'
	}),
	new webpack.NamedModulesPlugin(),
	new HtmlWebpackPlugin({
		template: path.join(sourcePath, 'index.html'),
		path: buildPath,
		filename: 'index.html',
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
			context: sourcePath,
		}
	}),
	new OpenBrowserPlugin({url: config.apiConfig.url})
];

// Common rules
const rules = [
	{
		test: /\.(js|jsx)$/,
		exclude: /node_modules/,
		use: [
			'babel-loader',
		],
	},
	{
		test: /\.(png|gif|jpg|svg|woff|woff2|eot|ttf|ico)$/,
		//include: paths.markupPath,
		use: 'url-loader?limit=20480&name=assets/[name]-[hash].[ext]',
	},
	// {
	//     test: /\.styl$/,
	//     use: [
	//         'style-loader',
	//         'css-loader',
	//         {
	//             loader: 'stylus-loader',
	//             options: {
	//                 preferPathResolver: 'webpack',
	//                 // use: [require('nib')()],
	//                 // import: ['~nib/lib/nib/index.styl']
	//             },
	//         },
	//     ],
	// }
	{
		test: /\.styl$/,
		//include: imgPath,
		loader: 'style-loader!css-loader!stylus-loader',
	}
];

if (isProduction) {
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
		new ExtractTextPlugin('style-[hash].css')
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
		new DashboardPlugin()
	);

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

module.exports = {
	devtool: isProduction ? 'eval' : 'source-map',
	context: jsSourcePath,
	entry: {
		js: './index.js',
		vendor: [
			'babel-polyfill',
			'es6-promise',
			'immutable',
			'isomorphic-fetch',
			'react-dom',
			'react-redux',
			'react-router',
			'react',
			'redux-thunk',
			'redux',
		],
	},
	output: {
		path: buildPath,
		publicPath: '/',
		filename: '[name]-[hash].js',
	},
	module: {
		rules,
	},
	resolve: {
		extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx', '.svg', '.ttf', '.woff', '.woff2'],
		modules: [
			path.resolve(__dirname, 'node_modules'),
			jsSourcePath,
		],
	},
	plugins,
	devServer: {
		contentBase: isProduction ? './build' : './source',
		historyApiFallback: true,
		port: 3000,
		compress: isProduction,
		inline: !isProduction,
		hot: !isProduction,
		host: 'react.modulbank.ru',
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
	},
	// stylus: {
	//     use: [require('nib')()],
	//     import: ['~nib/lib/nib/index.styl']
	// }
};
