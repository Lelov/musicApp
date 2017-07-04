<template>
  <div id="app">
    <!-- 头部 -->
    <nav-header></nav-header>
    <!-- 导航 -->
    <nav-tab></nav-tab>
    <!-- 将 router-view 的内容进行缓存 -->
    <keep-alive>
      <!-- 底部切换区域 -->
      <router-view></router-view>
    </keep-alive>
    <!-- 播放器组件 -->
    <player></player>
  </div>
</template>

<script>
import NavHeader from 'components/header/navHeader'
import NavTab from 'components/navTab/navTab'
import Player from 'components/player/player'

export default {
  name: 'app',
  components: {
    NavHeader,
    NavTab,
    Player
  },
  methods: {
    setFontSize () {
      // 获取屏幕宽度
      let windowWidth = document.body.clientWidth
      // 获取根元素
      const docEle = document.documentElement
      docEle.style.fontSize = (windowWidth / 10) + 'px'
    }
  },
  mounted() {
    this.$router.push('/recommend')
    // app 载入时调整根元素字体
    this.setFontSize()
    // app 宽度发生改变时调整根元素字体
    window.addEventListener('resize', this.setFontSize)
  }
}
</script>

<style>
#app {

  font-family: Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#app .wrap{
  position: fixed;top: 90px;bottom:0;overflow: auto;width: 100vw;
}
.wrap>div{
  position: relative;
}
</style>
