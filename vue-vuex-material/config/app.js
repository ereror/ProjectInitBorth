// 全局的 xhr host 配置
exports.serverHost = process.env.NODE_ENV !== 'development' ? '//prizedraw.myxianxiaobao.com/' : ''
// exports.defaulthost = '9diangame.com'
exports.defaulthost = '//prizedraw.myxianxiaobao.com/'
// // 文件服务器地址t'
exports.fileServer = '//prizedraw.myxianxiaobao.com/'
// 全局的 xhr config
// https://developer.mozilla.org/zh-CN/docs/Web/API/GlobalFetch/fetch drawt
// exports.defaulthost = '//prizedraw.myxianxiaobao.com/'
exports.xhrConfig = {
    method: 'GET',
    headers: {
        // 'Mock-Case': 'cases1', // mock 测试平台
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json; charset=UTF-8'
    },
    // mode: 'cors',
    credentials: 'include',
    // cache: 'default'
}