// 导入 jsonp 请求的js文件
import jsonp from 'common/js/jsonp'

// 获取推荐轮播图区域
export function getRecommendApi() {
  // 设置url地址
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1'
  // 设置回调函数
  const option = {
    param: 'jsonpCallback'
  }
  return jsonp(url, option)
}
