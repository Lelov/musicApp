import ajax from './ajax'
// 获取热门搜索
export default function getHot() {
  const url = 'http://music.163.com/weapi/search/hot'
  ajax(url)
    .then(res => {
      console.log(url)
    })
}