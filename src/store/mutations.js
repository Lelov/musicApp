import * as types from './mutation-types'
// 定义修改方法,与mutation-types中方法名一一对应
const mutations = {
  // 设置歌单列表
  [types.SET_PLAYLIST](state, playList) {
    state.playList = playList
  },
  // 设置播放列表
  [types.SET_PLAYINGLIST](state, playingList) {
    state.playingList = playingList
  },
  // 设置播放状态
  [types.SET_PLAYING](state, playing) {
    state.playing = playing
  },
  // 设置播放歌曲信息
  [types.SET_PLAYINGSONG](state, index) {
    state.playingSong = state.playingList[index]
  },
  // 设置播放歌曲信息
  [types.SET_PLAYINGSONGINDEX](state, index) {
    state.playingSongIndex = index
  },
  // 设置播放歌曲信息
  [types.SET_PLAYMODE](state, index) {
    state.playMode = index
  },
  // 设置顺序
  [types.SET_ORDERPLAYLIST](state, playingList) {
    state.orderPlayList = playingList
  }
}

export default mutations
