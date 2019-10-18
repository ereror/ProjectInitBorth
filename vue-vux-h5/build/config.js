// 全局的 xhr host 配置
exports.serverHost = process.env.NODE_ENV !== 'development' ? '' : ''

exports.defaulthost = ''
// // 文件服务器地址t'
exports.fileServer = ''
// 全局的 xhr config

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

exports.tokenUrl = ''