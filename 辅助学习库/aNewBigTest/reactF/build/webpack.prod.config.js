const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');
// vw适配
const autoprefixer = require('autoprefixer');
const postcssAspectRatioMini = require('postcss-aspect-ratio-mini');
const postcssPxToViewport = require('postcss-px-to-viewport');
const postcssWriteSvg = require('postcss-write-svg');
const postcssCssnext = require('postcss-cssnext');
const postcssViewportUnits = require('postcss-viewport-units');
const cssnano = require('cssnano');
const webpack = require('webpack');

new CleanWebpackPlugin()

module.exports = {
	entry: {
		app: [path.join(__dirname, '../src/index.js')],
		vendor: ['react', 'react-router-dom', 'redux', 'react-dom', 'react-redux'] // 提取公共代码
	},
	mode:'production',
	output: {
		publicPath : '/'
	},
	resolve: {
		alias: {
			services: path.join(__dirname, '../src/services'),
			'@': path.join(__dirname, '../src/assets'),
			actions: path.join(__dirname, '../src/redux/actions'),
			reducers: path.join(__dirname, '../src/redux/reducers'),
			pages: path.join(__dirname, '../src/pages'),
			components: path.join(__dirname, '../src/components'),
			router: path.join(__dirname, '../src/router')
		}
	},
	optimization: {
		splitChunks: {
			chunks: 'all'
		}
	},
	devtool: 'none',
	module: {
		rules: [{
			test: /\.js$/,
			use: ['babel-loader'],
			include: path.join(__dirname, '../src')
		}, {
			test: /(?!antd-mobile)\.css$/,
			use: [{loader: MiniCssExtractPlugin.loader}, {
				loader: 'css-loader',
				// options: {
				// 	modules: true,
				// 	localIdentName: '[local]-[hash]'
				// }
			}, 'less-loader', { // 适配vw
				loader: 'postcss-loader',
				options: {
					ident: 'postcss',
					plugins: () => [
						require('postcss-flexbugs-fixes'),
			            autoprefixer({
			              browsers: [
			                '>1%',
			                'last 4 versions',
			                'Firefox ESR',
			                'not ie < 9', // React doesn't support IE8 anyway
			              ],
			              flexbox: 'no-2009',
			            }),
						postcssAspectRatioMini({}),
						postcssPxToViewport({ 
						  viewportWidth: 750, // (Number) The width of the viewport. 
						  viewportHeight: 1334, // (Number) The height of the viewport. 
						  unitPrecision: 3, // (Number) The decimal numbers to allow the REM units to grow to. 
						  viewportUnit: 'vw', // (String) Expected units. 
						  selectorBlackList: ['.ignore', '.hairlines'], // (Array) The selectors to ignore and leave as px. 
						  minPixelValue: 1, // (Number) Set the minimum pixel value to replace. 
						  mediaQuery: false // (Boolean) Allow px to be converted in media queries. 
						}),
						postcssWriteSvg({
						  utf8: false
						}),
						// postcssCssnext({}),
						postcssViewportUnits({}),
						cssnano({
						  preset: "advanced", 
						  autoprefixer: false, 
						  "postcss-zindex": false 
						})
					]
				}
			}]
		}, {
			test: /\.(png|jpg|gif|jpeg)$/,
			use: [{
				loader: 'url-loader',
				options: {
					limit: 8192
				}
			}]
		}]
	},
	plugins: [
		new webpack.DefinePlugin({
	        'process.env': {
	            NODE_ENV: JSON.stringify('development')
	        }
	    }),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: path.join(__dirname, '../public/index.html')
		}),
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css',
			chunkfilename: '[id].[contenthash].css'
		}),
	    new OptimizeCssAssetsPlugin()
	]
}