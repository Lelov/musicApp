<template lang="html">
  <div class="player" v-show="playingList.length > 1" @click="showSong">
    <!-- 全屏播放器 -->
    <transition name="fullPlayer">
      <div class="full" v-show="isFull">
        <div @click="isFull=false" class="top">
          <go-back :title="playingSong.songName" h="48px">
            <p class="ar_name">{{playingSong.arName}}</p>
          </go-back>
        </div>
        <div class="song_img_area"> 
          <!-- 动画旋转类-->
          <div :style="{animationPlayState:playing ? 'running' : 'paused'}" class="ani_cont" ref="picAni">
            <img src="../../assets/images/full_default.png" class="song_img">
            <div class="song_cover_img" v-show=" playingSong.picUrl" >
              <img :src="playingSong.picUrl">
            </div>
          </div>
        </div> 
        <!--播放进度条  -->
        <div class="progress_bar">
          进度条
        </div>
        <!-- 底部功能按钮 -->
        <div class="play_tool">
          <!-- 播放模式 -->
          <div class="play_mode">
            <!-- <img src=""> -->
          </div>
          <!--上一曲-->
          <div class="last" @click="prevSong">
            <img src="../../assets/images/last.png">
          </div>
          <!--播放状态-->
          <div class="play_state" @click="playSatate">
            <img src="../../assets/images/play.png" v-show="!playing">
            <img src="../../assets/images/pause.png" v-show="playing">
          </div>
          <!--下一曲-->
          <div class="next" @click="nextSong">
            <img src="../../assets/images/next.png">
          </div>
          <!--播放列表-->
          <div class="play_list" @click="showMenu"></div>
        </div>
      </div>
    </transition>
    <!-- mini播放器 -->
    <transition name="mini_player_ani">
      <div class="mini" v-show="!isFull" @click="isFull=true">
        <div class="mini_main">
          <div class="mini_song_cover_img" v-show="playingSong.picUrl">
            <img :src="playingSong.picUrl" :style="{animationPlayState:playing ? 'running' : 'paused'}" class="ani_cont" width="40" height="40">
          </div>
          <div class="song_info">
            <!-- 歌曲名字  -->
            <p>{{ playingSong.songName}}</p>
            <!-- 歌手  -->
            <p>{{ playingSong.arName }}</p>
          </div>
        </div>
        <div class="mini_state" @click.stop="1>2">
          <!-- 播放状态  -->
          <div :class="toggleBgImg" @click="playSatate" ref="mState"></div>
          <div class="mini_play_list" @click="showMenu"></div>
        </div>
      </div>
    </transition>
    <!-- 播放列表 -->
    <div class="menu_layer" @click="showPlayingMenu=false"  v-show="showPlayingMenu"></div>
    <transition name="playing_menu_ani">
      <div class="playing_menu" v-show="showPlayingMenu" @click.stop="1>2">
        <div class="playing_menu_top">
          <div>切换播放模式</div>
          <div>清空</div>
        </div>
        <div class="playing_menu_item" @click="play(index)" v-for="(item,index) in playingList">
          <div :class="{playing_menu_item_info:true,cureentSong:index==playingSongIndex}"><img src="../../assets/images/aap.png" v-show="index==playingSongIndex"></ima>{{ item.songName }}<span> - {{ item.arName }}</span></div>
          <div class="" @click="delSong(index)"><img src="../../assets/images/x.png" alt=""></div>
        </div>
      </div>
    </transition>
    
    <div class="playControl">
      <audio ref="audio" :src="setUrl" autoplay controls @ended="nextSong" @canplay="getCanplayState">
        您的浏览器不支持 audio 标签。
      </audio>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import GoBack from 'components/common/goBack'
import { getSongUrl } from '../../common/js/song'


export default {
  components: {
    GoBack
  },
  data() {
    return {
      // 是否展示全屏播放
      isFull: true,
      // 设置播放歌曲地址
      setUrl: '',
      // 展示歌曲播放列表
      showPlayingMenu: false,
      // 歌曲资源是否准备完成
      canplayState: false
    }
  },
  computed: {
    ...mapGetters([
      'playingSong',
      'playing',
      'playingList',
      'playingSongIndex'
    ]),
    // 播放状态切换时对应图标跟着切换
    toggleBgImg() {
      return this.playing ? 'mini_pause' : 'mini_play'
    }
  },
  watch: {
    // 当歌曲索引发生改变的时候进行播放
    playingSongIndex() {
      this.getSongMUrl()
    },
    // 监听播放状态值
    playing() {
      this.$nextTick(() => {
        // 在资源准备未完成不允许操作
        if (!this.canplayState) return
        // 获取播放控件
        const audio = this.$refs.audio
        // 根据播放状态进行暂停与播放
        this.playing ? audio.play() : audio.pause()
      })
    }
  },
  methods: {
    getCanplayState() {
      // 资源请求成功,为可播放状态
      this.canplayState = true
    },
    // 播放上一首歌
    prevSong() {
      // 在资源准备未完成不允许操作
      if (!this.canplayState) return
      // 暂停播放,等待资源请求成功再执反
      this.setPlaying(false)
      // 获取当前播放歌曲索引并-1获取目标歌曲索引值
      let index = this.playingSongIndex - 1
      // 判断index的临界值
      if (index < 0) index = this.playingList.length - 1
      this.setPlayingSongIndex(index)
      // 点击时请求资源,此时资源未准备好
      this.canplayState = false
    },
    // 播放下一首歌
    nextSong() {
      // 在资源准备未完成不允许操作
      if (!this.canplayState) return
      // 暂停播放
      this.setPlaying(false)
      // 获取当前播放歌曲索引并+1获取目标歌曲索引值
      let index = this.playingSongIndex + 1
      // 判断index的临界值
      if (index > this.playingList.length - 1) index = 0
      this.setPlayingSongIndex(index)
      // 点击时请求资源,此时资源未准备好
      this.canplayState = false
    },
    play(index) {
      console.log(this.canplayState)
      // 在资源准备未完成不允许操作
      if (!this.canplayState) return
      // 设置播状态为true
      this.setPlaying(false)
      // 设置播放歌曲的索引
      this.setPlayingSongIndex(index)
    },
    // 删除歌曲
    delSong(index) {

    },
    getSongMUrl() {
      // 没有播放歌曲时不继续执行
      if (!this.playingSong) return
      // 获取播放索引值
      let i = this.playingSongIndex
      // 根据索引设置当前播放歌曲
      this.setPlayingSong(i)
      // 获取歌曲博凡连接地址
      getSongUrl(this.playingSong.songId, (res) => {
        // 设置播放歌曲连接地址
        this.setUrl = res
        // 设置播状态为true
        this.setPlaying(true)
      })
    },
    showMenu() {
      this.showPlayingMenu = true
    },
    playSatate() {
      // 获取mini播放房状态元素
      const mState = this.$refs.mState
      // 播放状态每次执反
      this.setPlaying(!this.playing)
    },
    showSong() {
      const audio = this.$refs.audio
      console.log(audio.seekable)
    },
    ...mapMutations({
      setPlaying: 'SET_PLAYING',
      setPlayingSong: 'SET_PLAYINGSONG',
      setPlayingSongIndex: 'SET_PLAYINGSONGINDEX',
      setPlayingList: 'SET_PLAYINGLIST'
    })
  }
}
</script>

<style lang="less" scoped>
.player {
  color: #000;
}

.player>div {
  position: fixed;
  z-index: 10000;
  width: 100vw;
}

.full {
  top: 0;
  height: 100vh;
  background-color: #493421;
}

.top {
  height: 48px;
  width: 100vw;
  box-shadow: 0 1px 2px rgba(0, 0, 0, .5);
  position: relative;
  z-index: 102;
}

.top::after {
  content: '';
  display: block;
  position: absolute;
  width: 30px;
  height: 40px;
  left: 0;
  top: 0;
  z-index: 2;
}

p.ar_name {
  color: rgba(255, 255, 255, .5)
}

.go_back {
  position: absolute;
  z-index: 1;
}

.song_img_area {
  padding-top: 2rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.song_img {
  width: 60%;
  border-radius: 50%;
}

.song_cover_img {
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  top: 0;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.song_cover_img img {
  width: 40%;
  border-radius: 50%;
}

.play_tool {
  padding: 0 1rem;
  display: flex;
  position: absolute;
  bottom: 1.4rem;
  width: 100%;
}

.play_tool>div {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.play_tool img {
  width: .7rem;
  height: .7rem;
}

.play_mode {
  background: url('../../assets/images/order.png') no-repeat center;
  background-size: cover;
}

.play_list {
  background: url('../../assets/images/menu_f.png') no-repeat center;
  background-size: cover;
}

.play_state img {
  width: 1.5rem;
  height: 1.5rem;
}

.mini {
  height: 50px;
  bottom: 0;
  background-color: #fff;
  display: flex;
  padding: 5px;
  box-shadow: 0 -1px 1px rgba(0, 0, 0, 0.2);
}

.mini_main {
  flex: 1;
  overflow: hidden;
  display: flex;
  align-items: center;
}

.mini_main .mini_song_cover_img,
.mini_main img {
  border-radius: 50%;
}

.mini_main img {
  display: flex;
}

.song_info {
  padding-left: 5px;
  flex: 1;
  text-align: left;
  font-size: 12px;
  color: #000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}

.msg>p {
  line-height: 1.5;
}

.song_info p:last-child {
  color: rgba(0, 0, 0, .5)
}

.mini_state {
  display: flex;
  justify-content: center;
  align-items: center;
}

.mini_state div:first-child {
  background: url('../../assets/images/m_pause.png') no-repeat center;
  background-size: cover;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid rgba(51, 51, 51, .5);
}

.mini_state div.mini_play {
  background-image: url('../../assets/images/m_play.png')
}

.mini_state div.mini_pause {
  background-image: url('../../assets/images/m_pause.png')
}

.mini_play_list {
  background: url('../../assets/images/menu_m.png') no-repeat center;
  background-size: cover;
  width: 50px;
  height: 50px;
}

.ani_cont {
  position: relative;
  animation: itemRotate 12s infinite linear;
}

.fullPlayer-enter {
  transform: translate3d(0, 80%, 0);
  opacity: 0
}

.fullPlayer-enter-active {
  transition: all .3s ease-in;
}

.fullPlayer-leave-active {
  transition: all .2s ease-in;
  transform: translate3d(0, 80%, 0);
  opacity: 0
}

.mini_player_ani-enter {
  opacity: 0
}

.mini_player_ani-enter-active {
  transition: all .5s ease-in;
}

.mini_player_ani-leave-active {
  transition: all .3s ease-in;
  opacity: 0
}

p {
  white-space: nowrap;
}

// 播放列表
.playing_menu {
  position: fixed;
  height: 55vh;
  z-index: 888;
  top: 45vh;
  overflow: auto;
}

.playing_menu_item {
  border-bottom: 1px solid rgba(160, 160, 160, .8);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 14px 10px;
}

// 顶部菜单
.playing_menu_top {
  background-color: #fff;
  height: 6vh;
  position: fixed;
  top: 40vh;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, .3)
}

.playing_menu_item>div {
  font-weight: 500;
  font-size: 14px;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.playing_menu_item_info {
  max-width: 90%;
  overflow: hidden;
  display: flex;
  align-items: center;
}

.playing_menu_item_info img {
  margin-right: 5px;
}

.playing_menu_item_info span {
  color: rgba(0, 0, 0, .5);
  font-size: 12px;
}

.playing_menu_item img {
  width: 18px;
  height: 18px;
}

div.menu_layer {
  height: 100vh;
  background-color: rgba(0, 0, 0, .3);
  transition: all .3s;
  position: fixed;
  top: 0;
}

// 当前播放的歌曲
div.cureentSong {
  color: #d43c33
}

div.cureentSong span {
  color: #d43c33
}

.playing_menu_ani-enter {
  transform: translate3d(0, 70%, 0);
  opacity: 0;
}

.playing_menu_ani-enter-active {
  transition: all .3s linear;
}

.playing_menu_ani-leave-active {
  transition: all .3s linear;
  transform: translate3d(0, 40%, 0);
  opacity: 0;
}

// 进度条
.progress_bar {
  position: fixed;
  bottom: 3rem;
  width: 100vw;
}
</style>
