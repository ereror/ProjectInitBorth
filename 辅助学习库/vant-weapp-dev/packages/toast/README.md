## Toast 轻提示

### 使用指南

在 index.json 中引入组件
```json
"usingComponents": {
  "van-toast": "path/to/vant-weapp/dist/toast/index"
}
```

### 代码演示

#### 文字提示

```javascript
import Toast from 'path/to/vant-weapp/dist/toast/toast';

Toast('我是提示文案，建议不超过十五字~');
```

```html
<van-toast id="van-toast" />
```

#### 加载提示

```javascript
Toast.loading({
  mask: true,
  message: '加载中...'
});
```


#### 成功/失败提示

```javascript
Toast.success('成功文案');
Toast.fail('失败文案');
```


#### 高级用法

```javascript
const toast = Toast.loading({
  duration: 0,       // 持续展示 toast
  forbidClick: true, // 禁用背景点击
  message: '倒计时 3 秒',
  loadingType: 'spinner',
  selector: '#custom-selector'
});

let second = 3;
const timer = setInterval(() => {
  second--;
  if (second) {
    toast.setData({
      message: `倒计时 ${second} 秒`
    });
  } else {
    clearInterval(timer);
    Toast.clear();
  }
}, 1000);
```

```html
<van-toast id="custom-selector" />
```

### 方法

| 方法名 | 参数 | 返回值 | 介绍 |
|-----------|-----------|-----------|-------------|
| Toast | `options | message` | toast 实例 | 展示提示 |
| Toast.loading | `options | message` | toast 实例 | 展示加载提示 |
| Toast.success | `options | message` | toast 实例 | 展示成功提示 |
| Toast.fail | `options | message` | toast 实例 | 展示失败提示 |
| Toast.clear | `clearAll` | `void` | 关闭提示 |
| Toast.setDefaultOptions | `options` | `void` | 修改默认配置，对所有 Toast 生效 |
| Toast.resetDefaultOptions | - | `void` | 重置默认配置，对所有 Toast 生效 |

### Options

| 参数 | 说明 | 类型 | 默认值 |
|-----------|-----------|-----------|-------------|
| type | 提示类型，可选值为 `loading` `success` `fail` `html` | `String` | `text` |
| position | 位置，可选值为 `top` `middle` `bottom` | `String` | `middle` |
| message | 内容 | `String` | `''` | - |
| mask | 是否显示背景蒙层 | `Boolean` | `false` |
| forbidClick | 是否禁止背景点击 | `Boolean` | `false` |
| loadingType | 加载图标类型, 可选值为 `spinner` | `String` | `circular` |
| zIndex | z-index 层级 | `Number` | `1000` |
| duration | 展示时长(ms)，值为 0 时，toast 不会消失 | `Number` | `3000` |
| selector | 自定义选择器 | `String` | `van-toast` |

### 更新日志

| 版本 | 类型 | 内容 |
|-----------|-----------|-----------|
| 0.1.1 | feature | 新增组件 |
| 0.3.0 | breaking change | 修改组件引入路径，避免编辑器报错的问题 |
| 0.3.2 | feature | 新增 z-index 属性 |
| 0.3.3 | bugfix | 修复滚动穿透问题 |
