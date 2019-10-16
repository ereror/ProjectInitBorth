// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}


module.exports = {
  build: {
    env: require('./prod.env'),
    index: resolve('./build/index.html'),
    assetsRoot: resolve('./build'),
    assetsSubDirectory: 'admin_static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8090,
    autoOpenBrowser: false,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    // host 配置见 `README.md`
    proxyTable: {
      '/Admin': {
        target: 'https://drawt.myxianxiaobao.com/',
        changeOrigin: true
      },
      '/admin': {
        target: 'https://drawt.myxianxiaobao.com/',
        changeOrigin: true
      }
      // '/Admin': {
      //   target: 'http://101.132.121.82:8090/',
      //   changeOrigin: true
      // }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
