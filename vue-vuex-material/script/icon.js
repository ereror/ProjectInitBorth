const fs = require('fs')
const path = require('path')
const os = require('os')

const iconConfigPath = path.resolve(__dirname, '../src/assets/icon.js')
const svgPath = path.resolve(__dirname, '../src/assets/svg/')

fs.readdir(svgPath, (err, files) => {
  let data = {
    path: '../assets/svg/',
    source: files.map(v => path.parse(v).name)
  }

  // for eslint
  let str = JSON.stringify(data, null, '  ').replace(/"/g, `'`)
  let content = `export default ${str}${os.EOL}`
  fs.writeFile(iconConfigPath, content, 'utf-8', err => {
    console.log(err || 'svg => icon 成功')
  })
})
