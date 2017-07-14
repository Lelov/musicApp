import axios from 'axios'
import ajax from './ajax'
// 根据歌曲id获取歌曲相关信息
// 参数: id 为需要请求的歌曲id
// fn: 处理请求成功后的回调函数
export const getSongInfo = (id, fn) => {
  // 需要返回的歌曲信息
  const songInfo = {}
  // 进行网络请求 
  //获取歌曲基本信息
  let info = `https://api.imjad.cn/cloudmusic/?type=detail&id=${id}`
  ajax(info, 'get', (res) => {
    // 获取歌曲信息
    const songs = res.songs[0]
    songInfo.id = songs.id
    songInfo.name = songs.name
    songInfo.pic = songs.al.picUrl
    songInfo.arName = songs.ar[0].name
    songInfo.arId = songs.ar[0].id
  })
  // 请求mp3资源
  let url = `https://api.imjad.cn/cloudmusic/?type=song&id=${id}`
  ajax(url, 'get', (res) => {
    // 设置播放链接地址
    songInfo.url = res.data[0].url
  })
  //获取歌词
  let lyric = `https://api.imjad.cn/cloudmusic/?type=lyric&id=${id}`
  ajax(lyric, 'get', (res) => {
    // 设置歌词信息
    // songInfo.lyric = res.data.lrc
    // 执行函数
    fn && fn(songInfo)
  })
}

export const getSongUrl = (id, fn) => {
  // 请求歌曲mp3资源
  let url = `https://api.imjad.cn/cloudmusic/?type=song&id=${id}`
  ajax(url, 'get', (res) => {
    // 设置播放链接地址
    let url = res.data[0].url
    // 回调函数
    fn && fn(url)
  })
}