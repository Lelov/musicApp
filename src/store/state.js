const state = {
  // 歌单id 
  playList: {},
  // 播放列表
  playingList: [],
  // 播放状态
  playing: false,
  // 播放的歌曲信息
  playingSong: {},
  // 设置播放歌曲在播放列表中的索引
  playingSongIndex: -1,
  // 播放模式 playMode: 顺序循环播放：loopPlay-> 0 随机：randomPlay -> 1 单曲循环：singlesPlay -> 2
  playMode: 0,
  // 顺序播放列表
  orderPlayList: {},
  addSong: '',
  remvoesong: ''
}

export default state
