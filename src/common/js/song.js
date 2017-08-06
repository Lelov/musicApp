import ajax from './ajax'
// 根据歌曲id获取歌曲相关信息
// 参数: id 为需要请求的歌曲id
// fn: 处理请求成功后的回调函数
export const getSongInfo = id => {
  // 需要返回的歌曲信息
  const songInfo = {}
  // 进行网络请求 
  //获取歌曲基本信息
  const info = `https://api.imjad.cn/cloudmusic/?type=detail&id=${id}`
  // 请求mp3资源
  let url = `https://api.imjad.cn/cloudmusic/?type=song&id=${id}`
  //获取歌词
  let lyric = `https://api.imjad.cn/cloudmusic/?type=lyric&id=${id}`

  //获取歌曲基本信息
  ajax(info)
    .then((res) => {
      comsole.log(this)
      // 获取歌曲信息
      const songs = res.songs[0]
      songInfo.id = songs.id
      songInfo.name = songs.name
      songInfo.pic = songs.al.picUrl
      songInfo.arName = songs.ar[0].name
      songInfo.arId = songs.ar[0].id
    })

  // 请求mp3资源
  ajax(url)
    .then(res => {
      // 设置播放链接地址
      songInfo.url = res.data[0].url
      return new Promise((resolve, reject) => {
        resolve(songInfo)
        console.log(songInfo)
      })
    })

  //   //获取歌词
  //   ajax(lyric)
  //     .then(res => {
  //       // 设置歌词信息
  //       // songInfo.lyric = res.data.lrc
  //       // 执行函数
  //       resolve(songInfo)
  //     })
  // })
}

// 请求歌曲mp3资源
export const getSongUrl = id => {
  // 请求地址
  const url = `https://api.imjad.cn/cloudmusic/?type=song&id=${id}`
  return new Promise((resolve, reject) => {
    ajax(url).then(res => {
      // 设置播放链接地址
      // 回调函数 
      resolve(res.data[0].url)
    })
  })
}

// 请求歌曲歌词资源
export const getSongLyric = id => {
  // 请求地址
  const url = `https://api.imjad.cn/cloudmusic/?type=lyric&id=${id}`
  return new Promise((resolve, reject) => {
    ajax(url)
      .then(res => {
        let result = null
        // 判断歌曲是否有歌词
        if (res.lrc) {
          const currentLrc = res.lrc.lyric
          const lrc = {
            // 歌词是否支持自动滚动
            autoScroll: currentLrc.indexOf('[0') >= 0 ? true : false,
            // 歌词
            lyric: currentLrc
          }
          result = lrc
        } else if (res.nolyric) {
          result = '纯音乐，无歌词'
        } else {
          result = '歌曲无歌词'
        }
        resolve(result)
      })
  })
}
