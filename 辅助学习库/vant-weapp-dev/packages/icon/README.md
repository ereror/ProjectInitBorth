## Icon 图标

### 使用指南

在 index.json 中引入组件
```json
"usingComponents": {
  "van-icon": "path/to/vant-weapp/dist/icon/index"
}
```

### 代码演示

#### 基础用法

设置`name`属性为对应的图标名称即可，所有可用的图标名称见右侧列表

```html
<van-icon name="success" />
```

### API

| 参数 | 说明 | 类型 | 默认值 |
|-----------|-----------|-----------|-------------|
| name | 图标名称 | `String` | - |
| info | 图标右上角文字提示 | `String | Number` | - |
| color | 图标颜色 | `String` | `inherit` |
| size | 图标大小，如 `20px`，`2em` | `String` | `inherit` |
| custom-style | 自定义样式 | `String` | - |
| class-prefix | 类名前缀 | `String` | `van-icon` |

### Event

| 事件名 | 说明 | 参数 |
|-----------|-----------|-----------|
| bind:click | 点击图标时触发 | - |

### 外部样式类

| 类名 | 说明 |
|-----------|-----------|
| custom-class | 根节点样式类 |

### 更新日志

| 版本 | 类型 | 内容 |
|-----------|-----------|-----------|
| 0.0.1 | feature | 新增组件 |
| 0.2.1 | feature | 新增 class-prefix 属性 |
| 0.3.6 | feature | 新增 custom-style 属性 |
