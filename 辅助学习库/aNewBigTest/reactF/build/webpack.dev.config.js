const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

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
		app: [path.join(__dirname, '../src/index.js')],
		vendor: ['react', 'react-router-dom', 'redux', 'react-dom', 'react-redux'] // 提取公共代码
	},
	mode:'development',
	output: {
		path: path.join(__dirname, '../dist'),
		filename: '[name].[hash].js',
		chunkFilename: '[name].[chunkhash].js'
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
	devtool: 'inline-source-map',
	devServer: {
		contentBase: path.join(__dirname, '../public'),
		compress: true, // gzip压缩
		host: '0.0.0.0',
		hot: true, // 热更新
		historyApiFallback: true, // 解决启动后刷新404
		port: 9090, // 端口
		proxy: { //配置服务代理
			'/common': {
				target: 'https://pwdev.myxianxiaobao.com/',
				pathRewrite: {'^/admin': ''}, // 可转换
				changeOrigin: true				
			},
			'/dataSyn': {
				target: 'http://148.70.76.231:8080/',
				pathRewrite: {'^/admin': ''}, // 可转换
				changeOrigin: true				
			},
			'/admin': {
				target: 'https://pwdev.myxianxiaobao.com/',
				pathRewrite: {'^/admin': ''}, // 可转换
				changeOrigin: true
			}
		}
	},
	module: {
		rules: [{
			test: /\.js$/,
			use: ['babel-loader?cacheDirectory=true'],
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
		new HtmlWebpackPlugin                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        ({
			filename: 'index.html',
			template: path.join(__dirname, '../public/index.html')
		}),
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css',
			chunkfilename: '[id].[contenthash].css'
		})
	]
}


/**
 * hash是跟整个项目的构建相关，只要项目里有文件更改，整个项目构建的hash值都会更改，并且全部文件都共用相同的hash值
chunkhash和hash不一样，它根据不同的入口文件(Entry)进行依赖文件解析、构建对应的chunk，生成对应的哈希值。
contenthash是针对文件内容级别的，只有你自己模块的内容变了，那么hash值才改变，所以我们可以通过contenthash解决上诉问题
 */