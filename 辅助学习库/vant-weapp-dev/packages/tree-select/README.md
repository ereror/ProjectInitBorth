## TreeSelect 分类选择

### 使用指南

在 index.json 中引入组件
```json
"usingComponents": {
  "van-tree-select": "path/to/vant-weapp/dist/tree-select/index"
}
```

### 代码演示
可以在任意位置上使用 van-tree-select 标签。传入对应的数据即可。
```html
<van-tree-select
  items="{{ items }}"
  main-active-index="{{ mainActiveIndex }}"
  active-id="{{ activeId }}"
  bind:click-nav="onClickNav"
  bind:click-item="onClickItem"
/>
```

```javascript
Page({
  data: {
    // ...
  },

  onClickNav({ detail = {} }) {
    this.setData({
      mainActiveIndex: detail.index || 0
    });
  },

  onClickItem({ detail = {} }) {
    this.setData({
      activeId: detail.id
    });
  }
});
```

### API

| 参数       | 说明      | 类型       | 默认值       | 必须      |
|-----------|-----------|-----------|-------------|-------------|
| items | 分类显示所需的数据，具体数据结构可看 数据结构	 | Array | [] | |
| main-active-index | 左侧导航高亮的索引	 | Number | 0 | |
| active-id	 | 右侧选择项，高亮的数据id	 | String | Number	 | 0 | |

### Event

| 事件名 | 说明 | 回调参数 |
|-----------|-----------|-----------|
| bind:click-nav | 左侧导航点击时，触发的事件 | event.detail.index：被点击的导航的索引 |
| bind:click-item | 右侧选择项被点击时，会触发的事件 | event.detail: 该点击项的数据 |

### 数据格式
#### items 分类显示所需数据的数据结构
`items` 整体为一个数组，数组内包含一系列描述分类的 object。

每个分类里，text表示当前分类的名称。children 表示分类里的可选项，为数组结构，id被用来唯一标识每个选项

```javascript
[
  {
    // 导航名称
    text: '所有城市',
    // 该导航下所有的可选项
    children: [
      {
        // 可选项的名称
        text: '温州',
        // 可选项的id，高亮的时候是根据id是否和选中的id是否相同进行判断的
        id: 1002
      },
      {
        // 可选项的名称
        text: '杭州',
        // 可选项的id，高亮的时候是根据id是否和选中的id是否相同进行判断的
        id: 1001
      }
    ]
  }
]
```

### 更新日志

| 版本 | 类型 | 内容 |
|-----------|-----------|-----------|
| 0.0.1 | feature | 新增组件 |
