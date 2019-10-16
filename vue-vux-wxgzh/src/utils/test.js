const OSS = require('ali-oss');
const client = new OSS({
  region: 'oss-cn-shanghai',
  accessKeyId: 'LTAIHjnqQt0Ai8Be',
  accessKeySecret: 'O4pKMATEUCpVUpIuVaAV0HE6NVdgkv'
});


async function listBuckets () {
  try {
    let result = await client.listBuckets();
    console.log(result)
  } catch(err) {
    console.log(err)
  }
}

async function putBucket() {
  try {
    const result = await client.putBucket('jdgamess');
    console.log(result);
  } catch (err) {
    console.log(err);
  }
}

async function getBucketAcl() {
	try {
       const result = await client.getBucketACL('jdgamess');
       console.log(result)
	} catch (err) {
      console.log(err)
	}
}

async function setBucketAcl () {
	try {
       const result = await client.putBucketACL('jdgamess', 'public-read');
       console.log(result)
	} catch (err) {
      console.log(err)
	}	
}

// 上传文件

async function uploadBucket () {
	try {
	   client.useBucket('solas')
       const result = await client.put('testfile', './tools.js');
       console.log(result)
	} catch (err) {
      console.log(err)
	}	
}

// 流式上传

uploadBucket();