import Jsonp from 'jsonp'
// 使用 promise 来进行再次封装
// url:获取发送的服务器地址 option:设置信息
export default function jsonp(url, option) {
  // resolve: 请求成功的处理函数
  //  reject: 请求失败的处理函数
  return new Promise((resolve, reject) => {
    //  err: 请求失败
    // data: 请求成功返回的数据
    Jsonp(url, option, (err, data) => {
      if (!err) {
        // 成功返回数据
        resolve(data)
      } else {
        // 失败返回错误信息
        reject(err)
      }
    })
  })
}
