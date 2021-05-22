'use strict';
const STS = require('qcloud-cos-sts');
const cloudbase = require('@cloudbase/node-sdk')
const app = cloudbase.init({
  env: process.env.tcbEnv
})
const db = app.database();
const _ = db.command;

function getCosToken() {
  // 配置参数
  const config = {
    secretId: process.env.secretId,
    secretKey: process.env.secretKey,
    proxy: '',
    durationSeconds: 1800,

    // 放行判断相关参数
    bucket: process.env.cosBucket,
    region: process.env.cosRegion,
    allowPrefix: '*', // 这里改成允许的路径前缀，可以根据自己网站的用户登录态判断允许上传的具体路径，例子： a.jpg 或者 a/* 或者 * (使用通配符*存在重大安全风险, 请谨慎评估使用)
    // 简单上传和分片，需要以下的权限，其他权限列表请看 https://cloud.tencent.com/document/product/436/31923
    allowActions: [
      // 简单上传
      'name/cos:PutObject',
      'name/cos:PostObject',
      // 分片上传
      'name/cos:InitiateMultipartUpload',
      'name/cos:ListMultipartUploads',
      'name/cos:ListParts',
      'name/cos:UploadPart',
      'name/cos:CompleteMultipartUpload'
    ],
  };

  // 获取临时密钥
  const shortBucketName = config.bucket.substr(0 , config.bucket.lastIndexOf('-'));
  const appId = config.bucket.substr(1 + config.bucket.lastIndexOf('-'));
  const policy = {
      'version': '2.0',
      'statement': [{
          'action': config.allowActions,
          'effect': 'allow',
          'principal': {'qcs': ['*']},
          'resource': [
              'qcs::cos:' + config.region + ':uid/' + appId + ':prefix//' + appId + '/' + shortBucketName + '/' + config.allowPrefix,
          ],
      }],
  };

  return new Promise(resolve => {
    STS.getCredential({
        secretId: config.secretId,
        secretKey: config.secretKey,
        proxy: config.proxy,
        durationSeconds: config.durationSeconds,
        policy: policy,
    }, function (err, tempKeys) {
        var result = JSON.stringify(err || tempKeys) || '';
        resolve(result);
    });
  })
}

exports.main = async (event, context) => {
  const body = JSON.parse(event.body);
  const cmd = body.cmd;
  const content = body.content;
  const type = body.type;

  if (cmd === 'getToken') {
    const res = await getCosToken();
    return res
  } else if (cmd === 'setData') {
    const code = (new Date()).getTime()
    const res = await db.collection('res-store').add({
      code,
      content,
      type
    })
    return {
      res,
      code
    }
  } else if (cmd === 'getData') {
    const res = await db.collection('res-store').where({
      code: _.eq(Number(content))
    }).get()
    return {
      url: res.data.map(d => ({ content: d.content, type: d.type }))
    }
  }
};