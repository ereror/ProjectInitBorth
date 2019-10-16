// components/category/category.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        visible:{
          type:Boolean,
          value:false
        },
        cateList: {
            type: Array,
            value: [{
                id: 1,
                title: "手机",
                child: [{
                    id: 1001,
                    title: "苹果"
                }, {
                    id: 1001,
                    title: "华为"
                }, {
                    id: 1001,
                    title: "三星"
                }]
            }, {
                id: 2,
                title: '母婴用品',
                child: [{
                    id: 2001,
                    title: "婴儿床"
                }]
            }]
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        SelectParentIndex: 0
    },

    /**
     * 组件的方法列表
     */
    methods: {
        changeParent(e) {
            let index = e.currentTarget.dataset.index;
            this.setData({
                SelectParentIndex: index
            })
        },
        selectChild(e){
          let index = e.currentTarget.dataset.index;
          let parentItem = this.properties.cateList[this.data.SelectParentIndex];
          let childItem = parentItem.child[index];
          this.triggerEvent('selectChange', childItem);
        }
    }
})
