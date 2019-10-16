<template>
  <view>
    <view class="cropper-wrapper">
		<canvas
            class="cropper"
            disable-scroll="true"
            @touchstart="touchStart"
            @touchmove="touchMove"
            @touchend="touchEnd"
            :style="{width: cropperOpt.width + 'px', height: cropperOpt.height + 'px','background-color': 'rgba(0, 0, 0, 0.8)'}"
            :canvas-id="cropperOpt.id">
		</canvas>
        <cover-view class="cropper-buttons-tip">图片只支持jpg,png,jpeg</cover-view>
        <cover-view class="cropper-buttons">
            <cover-view class="upload" @click="uploadTap"> 选择图片 </cover-view>
            <!-- <cover-view class="getCropperImage" bindtap="getCropperImage" v-if='{{false}}'> 生成图片 </cover-view> -->
            <cover-view class="getCropperImage" @click="saveCropperImage"> 完成 </cover-view>
        </cover-view>
    </view>
  </view>
</template>
<script>
import WeCropper from '../../static/libs/we-cropper/we-cropper.js'
import utils from '../../static/utils/index.js'
const device = wx.getSystemInfoSync()
const width = device.windowWidth
const height = device.windowHeight - 50
import Vue from 'vue';
let app = getApp()
export default Vue.extend({
	data() {
		return {
			type: '',
			originSrc: '',
			isChange: false,
			cropperOpt: {
				id: 'cropper',
				rotateI: 0, //旋转默认角度
				tranlateX: width / 2, //定义canvas 的原点
				tranlateY: height / 2, //定义canvas 的原点
				width, // 画布宽度
				height, // 画布高度
				scale: 2.5, // 最大缩放倍数
				zoom: 8, // 缩放系数,
				cut: {
					x: (width - width / 1.6) / 2,
					y: (height - width * 0.8) / 2,
					width: width / 1.6, //裁剪框的大小
					height: width / 1.6
				}
			},
			sizex: 750,
			sizey: 420
		}
	},
	methods: {
		getCropperImage() {
			this.wecropper.getCropperImage(src => {
				if (src) {
					wx.previewImage({
						current: '', // 当前显示图片的http链接
						urls: [src] // 需要预览的图片http链接列表
					})
				} 	else {
					console.log('获取图片地址失败，请稍后重试')
				}
			})
		},
		uploadTap() {
			const self = this
			wx.chooseImage({
				count: 1, // 默认9
				sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
				success(res) {
					self.isChange = true
					const src = res.tempFilePaths[0]
					const filesize = res.tempFiles[0].size
					// 判断文件后缀名是否符合要求
					let filename = src.substr(src.lastIndexOf('.') + 1, src.length)
					if (filesize > 50 * 1000 * 1000) {
						return utils.showFail('上传图片大小不能大于50M！')
					}
					if (filename !== 'jpg' && filename !== 'jpeg' && filename !== 'png') {
						utils.showFail('上传图片格式为jpg、png、jpeg')
					} else {
						//  获取裁剪图片资源后，给data添加src属性及其值
						self.wecropper.pushOrign(src)
						self.originSrc = src	
					}
				}
			})
		},
		saveCropperImage() {
			let type = this.type
			let originSrc = this.originSrc
			// if (!this.isChange) {
			// 	return wx.navigateBack()
			// }
			this.wecropper.getCropperImage(src => {
				// if (src && type.length && this.isChange) {
				if (src && type.length) {
					utils.getPage(-1).setData({
						[type]: src,
						['originSrc']: originSrc,
						['originEditSrc']: src
					})
					wx.navigateBack()
				} else {
					console.log('生成图片地址失败，请稍后重试')
				}
			})
		},
		touchStart(e) {
			this.wecropper.touchStart(e)
		},
		touchMove(e) {
			this.wecropper.touchMove(e)
		},
		touchEnd(e) {
			this.wecropper.touchEnd(e)
		}
	},
	onLoad(option) {
		// this.isChange = false
		let cropperOpt = this.cropperOpt
		let { ratio, src, type } = option
		if (option.width && option.height && option.sizex && option.sizey) {
			cropperOpt.cut.width = option.width * 1
			cropperOpt.cut.height = option.height * 1
			cropperOpt.cut.x = (width - option.width * 1) / 2
			cropperOpt.cut.y = (height - option.height * 1) / 2
			this.cropperOpt = cropperOpt
			this.sizex = option.sizex
			this.sizey = option.sizey
		}
		this.type = type
		const self = this
		//自定义高宽比
		if (ratio) {
			let { width, height } = this.cropperOpt
			let cwidth = this.cropperOpt.cut.width
			let cheight = cwidth * ratio
			let y = (height - cheight) / 2
			this.cropperOpt.cut.y = y
			this.cropperOpt.cut.height = cheight
		}
		this.wecropper = new WeCropper(cropperOpt)
			.on('ready', ctx => {
				let that = this
				if (src) {
					ctx.pushOrign(src)
				}
			})
			.on('beforeImageLoad', ctx => {
				wx.showToast({
					title: '上传中',
					icon: 'loading',
					duration: 20000
				})
			})
			.on('imageLoad', ctx => {
				wx.hideToast()
			})
			.on('beforeDraw', (ctx, instance) => {})
			.updateCanvas()
		// this.wecropper.on('ready', ctx => {
		// 	console.log('%o', ctx)
		// })
	}
})
</script>

<style>
page {
  -webkit-user-select: none;
  user-select: none;
  width: 100%;
  height: 100%;
  background-color: #f8f8f8;
  font-family: Arial, Helvetica, sans-serif;
  overflow-x: hidden;
}

.flex {
  display: flex;
  justify-content: center;
  align-items: center;
}
.cropper-wrapper {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #e5e5e5;
}

.cropper-buttons,
.cropper-buttons-tip {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100rpx;
  line-height: 100rpx;
  text-align: center;
  font-size: 24rpx;
}

.cropper-buttons-tip {
  bottom: 50px;
  color: gray;
}

.cropper-buttons .upload,
.cropper-buttons .getCropperImage {
  flex: 1;
  text-align: center;
  font-size: 32rpx;
}
.cropper {
  position: absolute;
  top: 0;
  left: 0;
}

.cropper-buttons {
  background-color: #666666;
  color: white;
}
</style>
