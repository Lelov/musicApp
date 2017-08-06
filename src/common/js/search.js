import ajax from './ajax'

// 根据 关键字 查询类型为 type 的歌曲
export default function search(keyWord, type = 1) {
  return new Promise((resolve, reject) => {
    const baseUrl = `https://api.imjad.cn/cloudmusic/?type=search&search_type=${type}&s=${keyWord}`
    ajax(baseUrl)
      .then(res => {
        res = res.result
        // 判断数据是否成功获取
        const arr = []
        switch (type) {
          // 处理单曲
          case 1:
            if (!res.songs) {
              resolve(0)
              return
            }
            dealSong(arr, res)
            break;
          // 处理专辑
          case 10:
            err(resolve, res.albumCount)
            dealAlbum(arr, res)
            break;
          // 处理歌单
          case 1000:
            err(resolve, res.playlistCount)
            dealPlaylist(arr, res)
            break;
        }
        resolve(arr)
      })

  })
}
// 处理歌单与专辑异常信息
function err(resolve, num) {
  if (num < 1) {
    resolve(0)
    return
  }
}
// 处理搜索单曲
function dealSong(arr, res) {
  // 设置获取参数的基本设置
  res.songs.forEach((item) => {
    // 存储歌曲信息
    const songInfo = {}
    songInfo.songId = item.id
    songInfo.songName = item.name
    songInfo.picUrl = item.al.picUrl
    songInfo.alId = item.al.id
    songInfo.alName = item.al.name
    songInfo.arId = item.ar[0].id
    songInfo.arName = item.ar[0].name
    arr.push(songInfo)
  })
}

// 处理搜索专辑
function dealAlbum(arr, res) {
  res.albums.forEach((item) => {
    // 存储专辑信息
    const albumInfo = {}
    albumInfo.name = item.name
    albumInfo.id = item.id
    albumInfo.pic = item.picUrl
    albumInfo.arName = item.artist.name
    albumInfo.time = item.publishTime
    arr.push(albumInfo)
  })
}

// 处理歌单
function dealPlaylist(arr, res) {
  res.playlists.forEach((item) => {
    // 存储歌单信息
    const playlistInfo = {}
    playlistInfo.name = item.name
    playlistInfo.id = item.id
    playlistInfo.pic = item.coverImgUrl
    playlistInfo.playCount = item.playCount
    playlistInfo.trackCount = item.trackCount
    arr.push(playlistInfo)
  })
}