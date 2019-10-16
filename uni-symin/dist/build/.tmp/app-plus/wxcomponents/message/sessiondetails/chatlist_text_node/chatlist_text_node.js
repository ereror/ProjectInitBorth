import {
    generateRichTextNode
} from './../../../../static/utils/message/index.js'
Component({
    properties: {
        lastestMsg: {
            type: String,
            value: {},
            observer(newVal, oldVal, changePath) {
                this.setData({
                    messagenode: generateRichTextNode(newVal,)
                })
            }
        }
    },
    option: {},
    data: {
        messagenode: []
    },
    methods: {}
})