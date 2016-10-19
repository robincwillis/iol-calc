const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const path = require('path');

if(process.argv.indexOf('--dev') !== -1) {
	process.env.ENV = 'dev';
} else {
	process.env.ENV = 'prod';
}

const config = {

	context: path.resolve(__dirname, 'src'),
	entry: {
		app	 : ['./js/application.js']
	},
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: '[name].js',
		publicPath: '/'
	},

	plugins: [
		new WebpackNotifierPlugin(),

		new ExtractTextPlugin('[name].css'),

		new webpack.HotModuleReplacementPlugin(),

		new HtmlWebpackPlugin({
			title : 'Webpack React Boilerplate',
			template: './src/templates/index.html',
			filename: 'index.html',
			inject:'body'
		}),

		new webpack.ProvidePlugin({
			_	: 'underscore'
		})
	],

	module: {

		loaders: [
				{
					test:	/\.(otf|eot|ttf|woff|woff2)$/,
					loader: 'file-loader?name=fonts/[name].[ext]'
				},
				{
					test:	/\.(png|jpg|gif|ico)$/,
					loader: 'file-loader?name=images/[name].[ext]'
				},
				{
					test:	/\.css$/,
					loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
				},
				{
					test:	/\.scss$/,
					loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!resolve-url-loader!sass-loader?sourceMap')
				},
				{
					test:	/\.json$/,
					loader: 'json-loader'
				},
				{
					test:	 /\.js$/,
					loader:	 'babel-loader',
					query:	 {
						presets: ['es2015', 'react', 'stage-0']
					}
				},
				{
					test: /\.hbs$/,
					loader: "handlebars-loader"
				},
				{
					test  : /\/es6-promise\.js$/,
					loader: 'imports?this=>window'
				},
				{
					test: /\.svg$/,
					loader: 'svg-inline'
				}
			]
	},
	sassLoader: {
		includePaths: [path.resolve(__dirname, "src/sass")]
	},
	postcss: [
		autoprefixer({
			browsers: ['last 2 versions']
		})
	],
	resolve: {
		root: [
			path.resolve(__dirname, 'src'),
			path.resolve(__dirname, 'src/js'),
			path.resolve(__dirname, 'src/images'),
			path.resolve(__dirname, 'node_modules')
		],
		extensions: ['', '.js', '.json', '.hbs', '.jpg', '.png', '.svg', '.sass', '.scss', '.css'],
		alias: {
			'_'				: 'underscore/underscore'
		}
	}
};


module.exports = config;
