<template>
    <div>
        <web-view :src="url"></web-view>
    </div>
</template>
<script>
    export default {
        name: 'webview',
        data() {
            return {
                url: ''
                // 'https://www.baidu.com'
            };
        },
        onLoad(option) {
            let url = ''
            if (option.url && option.url != '') {
                url = option.url
            } else {
                url = ''
                // 'https://www.baidu.com'
            }
			if (option.title) {
				wx.setNavigationBarTitle({
					title: option.title
				})
			}
            if (option.parameter) {
                let parameter = []
                try {
                    parameter = JSON.parse(option.parameter)
                } catch (e) {
                    parameter = []
                }
                if (parameter.length > 0) {
                    let parameterstr = ''
                    for (let i = 0, len = parameter.length; i < len; i++) {
                        parameterstr += `${parameter[i].key}=${parameter[i].data}`
                        if (i != len - 1) {
                            parameterstr += `&`
                        }
                    }
                    url = url + '?' + parameterstr
                }
            }
            this.url = url
        }
    };
</script>
<style scoped lang='less'>
</style>