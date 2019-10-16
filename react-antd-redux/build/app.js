// 全局的 xhr host 配置
exports.serverHost = process.env.NODE_ENV !== 'development' ? '//pwdev.myxianxiaobao.com/' : ''
// exports.defaulthost = '9diangame.com'
exports.defaulthost = ''
// // 文件服务器地址t'
exports.fileServer = 'http://www.hyjjdyg.com/dataSyn/api/img/'
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

exports.tokenUrl = '//www.hyjjdyg.com/'