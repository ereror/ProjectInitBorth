/**
 * Created by sail on 2017/6/1.
 */
import WeCropper from '../../../plugin/we-cropper/we-cropper.js'

const device = wx.getSystemInfoSync();
const width = device.windowWidth;
const height = device.windowHeight-50;

Page({
  data: {
    cropperOpt: {
      id: 'cropper',
      width,
      height,
      scale: 2.5,
      zoom: 5,
      cut: {
        x: width *0.1,
        y: (height - width * 0.8) / 2,
        width: width*0.8,
        height: width * 0.8
      }
    }
  },
  touchStart(e) {
    this.wecropper.touchStart(e)
  },
  touchMove(e) {
    this.wecropper.touchMove(e)
  },
  touchEnd(e) {
    this.wecropper.touchEnd(e)
  },
  getCropperImage() {
    this.wecropper.getCropperImage((src) => {
      if (src) {
        console.log(src)
        wx.previewImage({
          current: '', // 当前显示图片的http链接
          urls: [src] // 需要预览的图片http链接列表
        })
      } else {
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
        const src = res.tempFilePaths[0]
        //  获取裁剪图片资源后，给data添加src属性及其值

        self.wecropper.pushOrign(src)
      }
    })
  },
  onLoad(option) {
    const { cropperOpt } = this.data
    let { ratio,src } = option;
    //自定义图片
    if (src){
      self.wecropper.pushOrign(src)
    }
    //自定义高宽比
    if (ratio){
      let { width,height } = this.data.cropperOpt;
      let cwidth = this.data.cropperOpt.cut.width;
      let cheight = cwidth * ratio;
      let y = (height - cheight)/2;
      console.log(cheight)
      this.setData({
        'cropperOpt.cut.y':y,
        'cropperOpt.cut.height': cheight
      })

    }
    new WeCropper(cropperOpt)
      .on('ready', (ctx) => {
        console.log(`wecropper is ready for work!`)
      })
      .on('beforeImageLoad', (ctx) => {
        console.log(`before picture loaded, i can do something`)
        console.log(`current canvas context:`, ctx)
        wx.showToast({
          title: '上传中',
          icon: 'loading',
          duration: 20000
        })
      })
      .on('imageLoad', (ctx) => {
        console.log(`picture loaded`)
        console.log(`current canvas context:`, ctx)
        wx.hideToast()
      })
      .on('beforeDraw', (ctx, instance) => {
        console.log(`before canvas draw,i can do something`)
        console.log(`current canvas context:`, ctx)
      })
      .updateCanvas()
  }
})
