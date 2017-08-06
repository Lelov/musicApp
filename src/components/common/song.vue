<template>
  <div class="song_item" @click="play">
    <div class="song_ordinal">{{ songOrdinal }}</div>
    <div class="song_des">
      <div class="song_name">{{ songName }}</div>
      <div class="song_singer">{{ songSinger }}-{{ alName }}</div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  props: {
    // 歌曲序号
    songOrdinal: {
      type: Number,
      default: 0
    },
    // 歌曲名称
    songName: {
      type: String,
      default: ''
    },
    // 歌曲对应的歌手
    songSinger: {
      type: String,
      default: ''
    },
    // 歌曲id
    songId: {
      type: Number,
      default: 0
    },
    // 专辑名称
    alName: {
      type: String,
      default: ''
    },
    // 专辑id
    alID: {
      type: Number,
      default: 0
    }
  },
  computed: {
    ...mapGetters([
      'playList',
      'playing',
      'playingSongIndex'
    ])
  },
  methods: {
    play() {
      // 设置播状态为true
      this.setPlaying(false)
      // 设置播放歌曲的索引
      this.setPlayingSongIndex(this.songOrdinal - 1)
      // 设置歌单
      this.setList()
    },
    // 进行歌单列表的网络请求
    setList() {
      const arr = []
      this.playList.tracks.forEach((item) => {
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
      // 存储正序播放列表
      this.setOrderPlayList(arr)
      // 设置播放列表
      this.setPlayingList(arr)
    },
    ...mapMutations({
      // 设置播放列表
      setPlayingList: 'SET_PLAYINGLIST',
      // 设置播放状态
      setPlaying: 'SET_PLAYING',
      // 设置歌曲播放信息
      setPlayingSongIndex: 'SET_PLAYINGSONGINDEX',
      setOrderPlayList: 'SET_ORDERPLAYLIST'
    })
  }
}
</script>

<style lang="less" scoped>
.song_item {
  display: flex;
  height: 55px;
}

.song_ordinal {
  min-width: 35px;
  height: 100%;
  align-items: center;
  display: flex;
  color: #888;
}

.song_des {
  height: 100%;
  flex: 1 1 auto;
  border-bottom: 1px solid #ccc;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.song_des>div {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: normal;
}

.song_name {
  font-size: 15px;
}

.song_singer {
  font-size: 12px;
  color: #888;
  padding-top: 5px;
}
</style>
