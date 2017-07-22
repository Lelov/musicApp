<template lang="html">
  <div class="player" v-show="playingList.length > 1" @click="showSongLyric">
    <!-- 全屏播放器 -->
    <transition name="fullPlayer">
      <div class="full" v-show="isFull">
        <div @click.stop="showLyric = isFull = false" class="top">
          <go-back :title="playingSong.songName" h="48px">
            <p class="ar_name">{{ playingSong.arName }}</p>
          </go-back>
        </div>
        <div class="song_img_area" v-show="!showLyric"> 
          <!-- 动画旋转类-->
          <div :style="{animationPlayState:playing ? 'running' : 'paused'}" class="ani_cont" ref="picAni">
            <img src="../../assets/images/full_default.png" class="song_img">
            <div class="song_cover_img" v-show=" playingSong.picUrl" >
              <img :src="playingSong.picUrl">
            </div>
          </div>
        </div> 
        <div class="lyric_wrap" v-show="showLyric">
          <div class="lyric_cont">
            <div v-show="!songLyric.lrcState">
              <p>{{songLyric.resources}}</p>
            </div>
            <div v-show="songLyric.lrcState">
              <p v-for="(item,index) in songLyric.resources">{{ item }}</p>
            </div>
          </div>
        </div>
        <!--播放进度条  -->
        <div class="progress_bar_wrap">
          <progress-bar :playedTime="musicPlayedTime" :totalTime="musicTotalTime" :percent="musicPlayedPercent" @dragPercentChange="getDragPercent"></progress-bar>
        </div>
        <!-- 底部功能按钮 -->
        <div class="play_tool">
          <!-- 播放模式 -->
          <div :class="playModeBg" class="play_mode" @click="playModeChange"></div>
          <!--上一曲-->
          <div class="last" @click.stop="prevSong">
            <img src="../../assets/images/last.png">
          </div>
          <!--播放状态-->
          <div class="play_state" @click.stop="playSatate">
            <img src="../../assets/images/play.png" v-show="!playing">
            <img src="../../assets/images/pause.png" v-show="playing">
          </div>
          <!--下一曲-->
          <div class="next" @click.stop="nextSong">
            <img src="../../assets/images/next.png">
          </div>
          <!--播放列表-->
          <div class="play_list" @click="showMenu"></div>
        </div>
      </div>
    </transition>
    <!-- mini播放器 -->
    <transition name="mini_player_ani">
      <div class="mini" v-show="!isFull" @click.stop="isFull=true">
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
        <div class="mini_state">
          <!-- 播放状态  -->
          <div @click.stop="playSatate" ref="mState" class="mini_state_pic">
            <!-- mini 圆形播放进度条  -->
            <progress-circle :strokePercent="playedPercent"></progress-circle>
            <div :class="toggleBgImg"></div>
          </div>
          <div class="mini_play_list" @click.stop="showMenu"></div>
        </div>
      </div>
    </transition>
    <!-- 播放列表 -->
    <div class="menu_layer" @click="showPlayingMenu=false" v-show="showPlayingMenu"></div>
    <transition name="playing_menu_ani">
      <div class="playing_menu" v-show="showPlayingMenu" @click.stop="1>2">
        <div class="playing_menu_top">
          <div>切换播放模式</div>
          <div>清空</div>
        </div>
        <div class="playing_menu_item" @click="play(index)" v-for="(item,index) in orderPlayList">
          <div :class="{playing_menu_item_info:true,cureentSong:index==playingSongIndex}"><img src="../../assets/images/aap.png" v-show="index==playingSongIndex"></ima>{{ item.songName }}<span> - {{ item.arName }}</span></div>
          <div class="" @click="delSong(index)"><img src="../../assets/images/x.png" alt=""></div>
        </div>
      </div>
    </transition>
    <!-- 核心 播放器  -->
    <div class="playControl">
      <audio ref="audio" :src="setUrl" autoplay="true
      " @ended="musicChange" @canplay="getCanplayState" :loop="playMode === 2" @timeupdate="setPlayedTime" @durationchange="setTotalTime">
        您的浏览器不支持 audio 标签。
      </audio>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import GoBack from 'components/common/goBack'
import { getSongUrl, getSongLyric } from '../../common/js/song'
import ProgressBar from './progressBar'
import ProgressCircle from './progressCircle'

export default {
  components: {
    GoBack,
    ProgressBar,
    ProgressCircle
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
      canplayState: false,
      // 格式化后的歌曲总时长
      musicTotalTime: '',
      // 未格式化歌曲总时长
      duration: 0,
      // 格式化后的歌曲已播放时长
      musicPlayedTime: '',
      // 未格式化歌曲已播放时长
      currentTime: 0,
      // 歌曲播放进度
      musicPlayedPercent: 0,
      // mini圆形播放的百分比
      playedPercent: 100,
      // 播放模式的背景图片置换
      playModeBg: '',
      // 存储原播放数据
      oldPlayList: {},
      // 播放模式切换时的提示信息
      changeModeMsg: '',
      songLyric: {},
      // 展示歌词列表
      showLyric: false
    }
  },
  computed: {
    ...mapGetters([
      'playingSong',
      'playing',
      'playingList',
      'playingSongIndex',
      'playMode',
      'orderPlayList'
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
    },
    // 监听playMode值的变化
    playMode() {
      // 根据 playMode的值 置换播放模式的背景图
      this.playModeBg = this.playMode === 1 ? 'play_random' : this.playMode === 2 ? 'play_singles' : 'play_loop'
      // 根据playMode的值来置换随机歌曲数组与正序歌曲
      // playMode为1随机播放，其他为正序播放
      if (this.playMode === 1) {
        // 获取随机数组并设置随机播放列表
        this.setPlayingList(this.getRandomList(this.playingList))
      } else {
        // 正顺播放
        this.setPlayingList(this.orderPlayList)
      }
    }
  },
  methods: {
    // 生成随机播放列表
    getRandomList(arr) {
      // 处理数组地址
      const obj = {}
      obj.arr = arr
      const newArr = JSON.parse(JSON.stringify(obj.arr))
      // 处理数组
      for (let i = 0; i < newArr.length; i++) {
        // 获取随机数
        let j = Math.floor(Math.random() * (i + 1))
        // newArr[i]赋值给变量
        let c = newArr[i]
        // 改变当前的下标的值
        newArr[i] = newArr[j]
        // newArr[i]的值给随机下标
        newArr[j] = c
      }
      return newArr
    },
    // 改变播放模式
    playModeChange() {
      this.setPlayMode((++this.playMode) % 3)
    },
    musicChange() {
      console.log(this.playMode)
      // 单曲播放模式时让 音频重复播放
      if (this.playMode === 2) return
      const audio = this.$refs.audio
      //取消循环播时对loop取反
      if (audio.loop) audio.loop = false
      // 非单曲模式调用 播放下一曲
      this.nextSong()
    },
    /*------处理歌词 函数开始-----------*/
    showSongLyric() {
      this.showLyric = !this.showLyric
      getSongLyric(this.playingSong.songId, (res) => {
        // 判断是否有歌词，object为有歌词
        this.songLyric = {
          // 设置歌曲是否有歌词
          lrcState: typeof res === 'object' ? true : false,
          // 获取歌词信息歌词
          resources: res.lyric ? res.lyric : res,
          // 自动播放状态
          autoScroll: res.autoScroll
        }
        // 歌词进行格式化
        if (this.songLyric.lrcState) this.lyricFormat()
      })
    },
    lyricFormat() {
      const lrc = this.songLyric
      // 每句歌词播放对应的时间戳
      let lrcTimeArr = []
      // 获取每句歌词数据
      let lrcArr = lrc.resources.split(/\n+/).filter((item) => {
        // 过滤数值为空的的item
        return item !== ''
      })
      // 判断歌词是否支持自动播放
      if (lrc.autoScroll) {
        // 去掉时间提示为空白的字段
        const newLrcArr = lrcArr.filter((item) => {
          return item.split(']')[1] !== ''
        })
        lrcArr = []
        newLrcArr.forEach((item) => {
          const detail = item.split(']')
          // 设置每句歌词的时间戳数组
          lrcTimeArr.push(detail[0])
          // 获取每句歌词
          lrcArr.push(detail[1])
        })
      }
      // 对时间戳数组进行格式化处理
      this.lrcTimeformat(lrcTimeArr)
      // 设置歌词
      this.songLyric.resources = lrcArr
    },
    // 格式化歌曲时间
    lrcTimeformat(arr) {
      this.songLyric.songLyricTime = arr.map((item) => {
        item = item.split('[')[1].split('.')[0]

        return this.stringToTime(item)
      })
    },
    // 将 00:00 处理为时间戳
    stringToTime(val) {
      const time = val.split(':')
      let timeFrag = time[0].split('')
      // 处理分
      val = (timeFrag[0] + 0) * 60 + timeFrag[1] * 60
      // 处理秒
      val += time[1] * 1
      return val
    },
    /*------- 处理歌词 结束-----------
    --------- 播放工具 函数开始 --------
    */
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
    /* --------- 播放工具 函数结束-----------------*/
    play(index) {
      // 在资源准备未完成不允许操作
      if (!this.canplayState) return
      // 设置播状态为true
      this.setPlaying(false)
      // 设置播放歌曲的索引
      this.setPlayingSongIndex(index)
    },

    getSongMUrl() {
      // 没有播放歌曲时不继续执行
      if (!this.playingSong) return
      // 根据索引设置当前播放歌曲
      this.setPlayingSong(this.playingSongIndex)
      // 获取歌曲博凡连接地址
      getSongUrl(this.playingSong.songId, (res) => {
        // 设置播放歌曲连接地址
        this.setUrl = res
        // 设置播状态为true
        this.setPlaying(true)
      })
    },
    getCanplayState() {
      // 资源请求成功,为可播放状态
      this.canplayState = true
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
    setTotalTime() {
      // 获取歌曲总时长，并格式化时间
      const audio = this.$refs.audio
      this.durationTime = audio.duration
      this.musicTotalTime = this.timeFormat(this.durationTime)
    },
    setPlayedTime() {
      this.getPercent()
      // 设置已播放时长
      const audio = this.$refs.audio
      this.currentTime = audio.currentTime
      this.musicPlayedTime = this.timeFormat(this.currentTime)
      // 设置圆形进度条比例
      this.playedPercent = Math.floor((1 - this.musicPlayedPercent) * 100)
      // // 设置歌词播放
      // this.lyricFormat(this.currentTime)
    },
    // 计算个位小/大于10的情况
    sum(time) {
      time = time < 10 ? '0' + time : time
      return time
    },
    // 根据毫秒数计算分秒
    // time: 音频已播放时间/总时长
    timeFormat(time) {
      // 对 time 进行取整处理
      time = Math.floor(time)
      // 对time分情况处理
      // 1) 小于60秒钟
      if (time < 60) {
        time = '00:' + this.sum(time)
      } else {
        // 2) 大于60秒
        // 计算60出现次数
        let times = Math.floor(time / 60)
        // 根据60出现次数重新计算 time
        time = time - times * 60
        time = this.sum(times) + ':' + this.sum(time)
      }
      // 返回数据
      return time
    },
    //设置播放百分比
    getPercent() {
      this.musicPlayedPercent = this.currentTime / this.durationTime
    },
    getDragPercent(percent) {
      // 歌曲资源未准备好禁止触发拖拽
      if (!this.canplayState) return
      // 根据比例重新计算拖动的进度条位置
      const audio = this.$refs.audio
      audio.currentTime = audio.duration * percent / 100
    },
    ...mapMutations({
      setPlaying: 'SET_PLAYING',
      setPlayingSong: 'SET_PLAYINGSONG',
      setPlayingSongIndex: 'SET_PLAYINGSONGINDEX',
      setPlayingList: 'SET_PLAYINGLIST',
      setPlayMode: 'SET_PLAYMODE'
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
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;
}

.top {
  height: 48px;
  width: 100vw;
  box-shadow: 0 1px 2px rgba(0, 0, 0, .5);
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
  flex: 1;
}

.song_img {
  width: 60%;
  border-radius: 50%;
}

.song_cover_img {
  width: 60%;
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
  width: 60%;
  border-radius: 50%;
}

.play_tool {
  padding: 0 1rem;
  display: flex;
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

.play_loop {
  background-image: url('../../assets/images/order.png')
}

.play_random {
  background-image: url('../../assets/images/aag.png')
}

.play_singles {
  background-image: url('../../assets/images/singing.png')
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
  position: relative;
}

.mini_state_pic div:last-child {
  position: relative;
  background: url('../../assets/images/m_pause.png') no-repeat center;
  background-size: cover;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid rgba(51, 51, 51, .2);
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
  border-bottom: 1px solid rgba(160, 160, 160, .3);
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
  border-bottom: 1px solid rgba(160, 160, 160, .3)
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
  transition: all .1s linear;
}

.playing_menu_ani-leave-active {
  transition: all .1s linear;
  transform: translate3d(0, 40%, 0);
  opacity: 0;
}

// 进度条
.progress_bar_wrap {
  padding: 5px 0;
}

// 歌词样式
.lyric_wrap {
  color: #fff;
  font-size: 16px;
  line-height: 1.5;
  flex: 1;
  overflow: auto;
  position: relative;
}

.lyric_cont div:first-child {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
