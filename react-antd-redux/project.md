#前端说明文档

##技术
```
  react + redux + ant-mobile
```

##编译
```
   0. 初始化
        npm init
   1. 运行环境
        npm start
   2. 打包构建
        npm run-script build
        **打包后的文件存放于dist目录
```


## 目录功能对应

/public             编译文件入口
/dist               构建编译后的文件
/node_modules       项目依赖包
/build              构建文件
/src                逻辑源码文件
  |-- assets        样式图片源文件
      |-- pages
      |-- components
  |-- components    组件样式源文件
  |-- mock          测试mock服务
  |-- pages         页面文件夹结构
      |-- addNew    新增页面
      |-- blacklist 首页列表页
      |-- default   默认页
      |-- detail    详情页
      |-- query     查询条件中转页
      |-- querylist 查询搜索列表页
      |-- 其他测试页
  |-- redux         redux文件夹，获取用户信息
  |-- router        页面路由
  |-- service       请求模块文件夹
  |-- util          工具类
index.js            主入口文件

#注意项:
```
   1.注意package.json 版本情况。最好不做更新，以免影响编译冲突
   2.做开发的时候，为了兼容pc端，移动端，对于pc端，因为项目中采用了vw，vh单位，所以，要单独对pc端写一份，请参考页面样式文件写法。
   3.如有疑问联系qq: 709213371
```
