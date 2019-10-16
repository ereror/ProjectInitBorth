import { uploadFile } from '../utils/req.js';

export default {
  upload(param) {
    return uploadFile('/xiaochengxu/File/upload',param)
  },
  uploadCan(param) {
    return uploadFile('/xiaochengxu/file/upload_can', param)
  },
  uploadFile(param) {
    return uploadFile('/xiaochengxu/file/uploadfile', param)
  }
}