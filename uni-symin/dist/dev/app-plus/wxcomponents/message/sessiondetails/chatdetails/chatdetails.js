import {
    generateRichTextNode
} from './../../../../static/utils/message/index.js'
Component({
    properties: {
        message: {
            type: Object,
            value: {},
            observer(newVal, oldVal, changePath) {
                this.setData({
                    messagenode: generateRichTextNode(newVal.text)
                })
            }
        },
        me: {
            type: Object,
            value: {},
        },
        you: {
            type: Object,
            value: {},
        }
    },
    option: {},
    data: {
        messagenode: [{
            name: 'div',
            attrs: {
                class: 'div_class',
                style: 'line-height: 60px; color: red;'
            },
            children: [{
                type: 'text',
                text: 'Hello&nbsp;World!'
            }]
        }]
    },
    methods: {
        conversationdetails(e) {
            // console.log(e)
            wx.navigateTo({
                url: '/pages/chat/details/details',
            })
        }
    }
})