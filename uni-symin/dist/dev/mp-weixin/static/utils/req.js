var Fly = require("flyio/dist/npm/wx") //引入微信请求模块
var fly = new Fly; //创建fly实例
var tokenFly = new Fly();
import util from './index.js';
import config from '../../config.js'
var isdebugger = true;
//添加finally方法
Promise.prototype.finally = function(callback) {
  let P = this.constructor;
  return this.then(
    value => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => {
      throw reason
    })
  );
};


//设置超时

fly.config.timeout = 10000;
//设置请求基地址

tokenFly.config.baseURL = config.baseURL;
fly.config.baseURL = config.baseURL + config.miniAppName;
//给所有请求添加自定义header

fly.config.headers = tokenFly.config.headers = {
  "content-type": "application/x-www-form-urlencoded"
}

//添加请求拦截器
fly.interceptors.request.use((request) => {
  let token = wx.getStorageSync('token');
  request.headers["token"] = token;
})

//添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
  (response) => {
    util.hideAll()
      //只将请求结果的data字段返回
    if (response.data.code == 200) {
      return response.data
    } else {
      // if (isdebugger && (response.data.code + '').length != 5) {
      //   util.showFail(response.data.msg)
      // }
      return response.data;
    }
  },
  (err) => {
    //发生网络错误后会走到这里
    util.hideAll()
    let status = err.status
    switch (status) {
      case 401:
        console.log("token过期，授权失败");
        // fly.lock()
        return new Promise((resove, reject) => {
          //登陆
          uni.login({
            success: function(res) {
              let code = res.code;
              if (code) {
                //发起网络请求
                resove(code)
              } else {
                reject(0)
              }
            },
            fail: function() {
              reject(0)
            }
          });
        }).then((code) => {
          return tokenFly.post(config.TokenURL, {
            code
          })
        }).then((d) => {
          let {
            openid,
            token
          } = d.data.data
          err.request.headers["token"] = token;
          wx.setStorageSync("token", token); //保存token
          wx.setStorageSync("openid", openid); //保存uid
        }).finally(() => {
          fly.unlock(); //解锁后，会继续发起请求队列中的任务，详情见后面文档
        }).then(() => {
          return fly.request(err.request); //只有最终返回request对象时，原来的请求才会继续
        });
        break;
      default:
        {
		  // let str = ''
		  // for(var item in err) {
			 //  str += item + err[item] + ';'
		  // }
    //       util.showModal({
    //         content: '请求网络出了问题,请稍后再试~~--' + str
    //       });
          return new Promise((resove, reject) => {
            reject({
              errormsg: true
            })
          })
        }
    }
  }
)
const uploadFile = (url, {
    name = "file",
    filePath,
    formData = {}
  } = {}) => {
    url = config.baseURL + url;
    let token = wx.getStorageSync('token');
    return new Promise((resove, reject) => {
      wx.uploadFile({
        url,
        filePath,
        name,
        header: {
          token
        },
        formData,
        success: function(res) {
          if (res.statusCode == 200) {
            let data = JSON.parse(res.data)
            if (data.code == 10000 || data.code == 200) {
              resove(data.data)
            } else {
              resove({
                code: 0
              })
              util.showModal({
                content: "上传失败"
              })
            }
          } else {
            reject({
              code: 1
            })
            util.showModal({
              content: "上传失败"
            })
          }
        },
        fail: function(res) {
          reject({
            code: 1
          })
          util.showModal({
            content: "上传失败"
          })
          wx.hideLoading();
        },
        complete: function(res) {},
      })
    })
  }
  //统一处理报错时，不再往下执行
const req = {
  post(url, param) {
    return new Promise((resove, reject) => {
      fly.post(url, param).then((d) => {
        if (d) resove(d)
      })
    })
  },
  get(url, param) {
    return new Promise((resove, reject) => {
      fly.get(url, param).then((d) => {
        if (d) resove(d)
      })
    })
  }
}

const uploadFileProgress = (url, {
    name = "file",
    filePath,
    formData = {},
	success = function() {},
	fail = function() {}
  } = {}) => {
    url = config.baseURL + url;
    let token = wx.getStorageSync('token');
    return wx.uploadFile({
        url,
        filePath,
        name,
        header: {
          token
        },
        formData,
        success: function(res) {
          if (res.statusCode == 200) {
            let data = JSON.parse(res.data)
            if (data.code == 10000) {
				success && success(data)
            } else {
			  success && success(data)
              util.showModal({
                content: "上传失败"
              })
            }
          } else {
			success && success({msg: '上传失败'})
            util.showModal({
              content: "上传失败"
            })
          }
        },
        fail: function(res) {
		  fail && fail({msg: '上传失败'})
          util.showModal({
            content: "上传失败"
          })
          wx.hideLoading();
        },
        complete: function(res) {},
      })
  }
export {
  fly,
  req,
  uploadFile,
  uploadFileProgress
}