const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// vw适配
const autoprefixer = require('autoprefixer');
const postcssAspectRatioMini = require('postcss-aspect-ratio-mini');
const postcssPxToViewport = require('postcss-px-to-viewport');
const postcssWriteSvg = require('postcss-write-svg');
const postcssCssnext = require('postcss-cssnext');
const postcssViewportUnits = require('postcss-viewport-units');
const cssnano = require('cssnano');

module.exports = {
	entry: {
		app: [path.join(__dirname, './../src/main.js')]
	},
	mode: 'development',
	output: {
		path: path.join(__dirname, './../dist'),
		filename: '[name].[hash].js',
		chunkFilename: '[name].[chunkhash].js'
	},
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.json', '.vue'],
		alias: {
			'@': path.join(__dirname, './../src'),
		}
	},
	// devTool: 'inline-source-map',
	devServer: {
		contentBase: path.join(__dirname, './../public'),
		compress: true, // gzip压缩
		host: '0.0.0.0',
		hot: true, // 热更新
		historyApiFallback: true, // 解决启动后刷新404
		proxy: {}
	},
	module: {
		// rules 里面要采用相对路径
		rules: [{
			test: /\.js$/,
			use: ['babel-loader?cacheDirectory=true'],
			include: path.join(__dirname, '../src')
		}, {
			test: /.(css|less)$/,
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
			}],
			include: [path.join(__dirname, '../src')]
		}, {
			test: /\.vue$/,
      		use: ['vue-loader']
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
		new HtmlWebpackPlugin                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        ({
			filename: 'index.html',
			template: path.join(__dirname, './../index.html')
		}),
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css',
			chunkfilename: '[id].[contenthash].css'
		}),
		new VueLoaderPlugin()
	]
}