import Pen from './lib/pen';
import Downloader from './lib/downloader';

const util = require('./lib/util');

const downloader = new Downloader();

// 最大尝试的绘制次数
const MAX_PAINT_COUNT = 5;
Component({
  canvasWidthInPx: 0,
  canvasHeightInPx: 0,
  paintCount: 0,
  /**
   * 组件的属性列表
   */
  properties: {
    customStyle: {
      type: String,
    },
    palette: {
      type: Object,
      observer: function (newVal, oldVal) {
        if (this.isNeedRefresh(newVal, oldVal)) {
          this.paintCount = 0;
          this.startPaint();
        }
      },
    },
  },

  data: {
    picURL: '',
    showCanvas: true,
    painterStyle: '',
  },

  attached() {
    setStringPrototype();
  },

  methods: {
    /**
     * 判断一个 object 是否为 空
     * @param {object} object
     */
    isEmpty(object) {
      for (const i in object) {
        return false;
      }
      return true;
    },

    isNeedRefresh(newVal, oldVal) {
      if (!newVal) {
        return false;
      }
      return true;
    },

    startPaint() {
      if (this.isEmpty(this.properties.palette)) {
        return;
      }

      if (!getApp().painterScreenRatio) {
        try {
          const systemInfo = wx.getSystemInfoSync();
          getApp().painterScreenRatio = systemInfo.screenWidth / 750;
        } catch (e) {
          const error = `Painter get system info failed, ${JSON.stringify(e)}`;
          that.triggerEvent('imgErr', { error: error });
          console.error(error);
          return;
        }
      }
      screenK = getApp().painterScreenRatio;

      this.downloadImages().then((palette) => {
        const { width, height } = palette;
        this.canvasWidthInPx = width.toPx();
        this.canvasHeightInPx = height.toPx();
        if (!width || !height) {
          console.error(`You should set width and height correctly for painter, width: ${width}, height: ${height}`);
          return;
        }
        this.setData({
          painterStyle: `width:${width};height:${height};`,
        });
        const ctx = wx.createCanvasContext('k-canvas', this);
        const pen = new Pen(ctx, palette);
        pen.paint(() => {
          this.saveImg();
        });
      });
    },

    downloadImages() {
      return new Promise((resolve, reject) => {
        let preCount = 0;
        let completeCount = 0;
        const paletteCopy = JSON.parse(JSON.stringify(this.properties.palette));
        if (paletteCopy.background && util.isValidUrl(paletteCopy.background)) {
          preCount++;
          downloader.download(paletteCopy.background).then((path) => {
            paletteCopy.background = path;
            completeCount++;
            if (preCount === completeCount) {
              resolve(paletteCopy);
            }
          }, () => {
            completeCount++;
            if (preCount === completeCount) {
              resolve(paletteCopy);
            }
          });
        }
        if (paletteCopy.views) {
          for (const view of paletteCopy.views) {
            if (view && view.type === 'image' && view.url && util.isValidUrl(view.url)) {
              preCount++;
              /* eslint-disable no-loop-func */
              downloader.download(view.url).then((path) => {
                view.url = path;
                completeCount++;
                if (preCount === completeCount) {
                  resolve(paletteCopy);
                }
              }, () => {
                completeCount++;
                if (preCount === completeCount) {
                  resolve(paletteCopy);
                }
              });
            }
          }
        }
        if (preCount === 0) {
          resolve(paletteCopy);
        }
      });
    },

    saveImg() {
      const that = this;
      setTimeout(() => {
        wx.canvasToTempFilePath({
          canvasId: 'k-canvas',
          success: function (res) {
            wx.getImageInfo({
              src: res.tempFilePath,
              success: (infoRes) => {
                if (that.paintCount > MAX_PAINT_COUNT) {
                  const error = `The result is always fault, even we tried ${MAX_PAINT_COUNT} times`;
                  console.error(error);
                  that.triggerEvent('imgErr', { error: error });
                  return;
                }
                // 比例相符时才证明绘制成功，否则进行强制重绘制
                if (Math.abs((infoRes.width * that.canvasHeightInPx - that.canvasWidthInPx * infoRes.height) / (infoRes.height * that.canvasHeightInPx)) < 0.01) {
                  that.triggerEvent('imgOK', { path: res.tempFilePath });
                } else {
                  that.startPaint();
                }
                that.paintCount++;
              },
              fail: (error) => {
                console.error(`getImageInfo failed, ${JSON.stringify(error)}`);
                that.triggerEvent('imgErr', { error: error });
              },
            });
          },
          fail: function (error) {
            console.error(`canvasToTempFilePath failed, ${JSON.stringify(error)}`);
            that.triggerEvent('imgErr', { error: error });
          },
        }, this);
      }, 300);
    },
  },
});

let screenK = 0.5;

function setStringPrototype() {
  /* eslint-disable no-extend-native */
  String.prototype.toPx = function toPx() {
    const reg = /^[0-9]+([.]{1}[0-9]+){0,1}(rpx|px)$/g;
    const results = reg.exec(this);
    if (!this || !results) {
      console.error(`The size: ${this} is illegal`);
      return 0;
    }
    const unit = results[2];
    const value = parseFloat(this);

    let res = 0;
    if (unit === 'rpx') {
      res = value * screenK;
    } else if (unit === 'px') {
      res = value;
    }
    return res;
  };
}
