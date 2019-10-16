import {
  req
} from '../static/utils/req.js'

export default {
  usermessage: {
    name: 'zhangsan'
  },
  getUserinfo(param) {
    return req.post("/mobile/Member/UserInfo", param)
  },
  save(param) {
    return req.post("/mobile/Member/save", param)
  }
}