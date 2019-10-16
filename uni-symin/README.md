# sy-mini

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
### 项目问题
1. cover-view 在支持css样式上有些不兼容，比如，box-shadow;border-radius

### uni框架问题

1. 组件中 采用upx单位在运行时候，打包成小程序时，没有转换成rpx
2. upx的api部分没有和wx提供的api完全兼容；在计算custombar上有些问题
3. vue 组件引入，老是编译出错，从components组件上引入的vue，不能使用， 注意script中的lang字段会对这个问题有影响。
4. 编译的时候自动丢掉了组件化，不支持 import 组件的导入小程序模板情况
5. 框架中的，组件的样式默认与全局进行隔离咯
6. 编译过程中老是有些问题
7. 组件中的关键词会导致组件无法引入，会与微信默认组件冲突，如dialog组件
8. 组件大小写敏感，如果组件中有大写字母，将会被转成vue的组件格式，导致小程序组件报错
9. app全局事件中，采用app.$vm.[事件名]
10. App.vue 中要是用app中的globalData中的数据，在方法里面调用 let app = this.$option
11. 真机预览~define is not defind;报错,微信开发者工具版本有关，升级开发工具版本
12. 分享卡片进去后，on，注册的方法，在调用时丢失生命周期
### checkId
1. wxd82bf4ec8eb9b58b 正式 wxc881ec11d1c25658 测试
2. 接口域名 sns.peiwochoujiang.com