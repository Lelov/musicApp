<template>
  <transition name="fade">
    <div class="full_box" ref="detailWrap" @scroll="scroll">
      <div @click="goBack">
        <go-back :title="playList.name" :bgColor="'rgba(212, 60, 51, .2)'" ref="goBack"></go-back>
      </div>
  
      <div class="play_list_detail">
        <!--头部信息区-->
        <div class="detail_head">
          <!-- 图片区域 -->
          <div class="detail_head_pic">
            <img v-lazy="playList.coverImgUrl" ref="detailPic">
          </div>
        </div>
        <div v-show="loadingState">
          <loading></loading>
        </div v-show="!loadingState">
        <div ref="listDes" :style="{top: setTop}" class="list_des">
          <song v-for="(item,index) in playList.tracks" :songName="item.name" :songId="item.id" :songOrdinal="index+1" :alName="item.al.name" :songSinger="item.ar[0].name" :key="index"></song>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import GoBack from './goBack'
import { mapGetters } from 'vuex'
import Song from './song'
import Loading from './loadingb'

export default {
  components: {
    GoBack,
    Song,
    Loading
  },
  data() {
    return {
      isLoading: false,
      oldTop: '',
      goBackH: '',
      loadingState: false
    }
  },
  mounted() {
    this.oldTop = window.innerWidth * 3 / 5
  },
  computed: {
    setTop() {
      return window.innerWidth * 3 / 5 + 'px'
    },
    // 在计算属性中将getters中的方法通过数组的方式映射到当前实例中
    ...mapGetters([
      'playList'
    ])
  },
  methods: {
    scroll() {
      // 获取返回区域的高度
      this.goBackH = this.$refs.goBack.$el.offsetHeight
      // 获取滚动距离
      let scrollDis = this.$refs.detailWrap.scrollTop
      // 设置返回区域的背景颜色透明度rgba(212, 60, 51, .2)
      // 获取顶部区域颜色变化比率
      let bgRant = scrollDis / (this.oldTop - this.goBackH) * 0.8 + 0.2
      // 透明度为1时无需进行设置
      if (bgRant > 1) {
        // 处理当滑动过快顶部透明度不变化
        this.$refs.goBack.$el.style.backgroundColor = `rgba(212, 60, 51, 1)`
        return
      }
      // 设置透明度
      this.$refs.goBack.$el.style.backgroundColor = `rgba(212, 60, 51, ${bgRant})`

      /* 设置图片 */
      // 获取图片缩放比率
      let picRant = scrollDis / this.oldTop / 2
      // 设置边界
      if (picRant > .4) return
      // 根据比率改变图片缩放大小
      this.$refs.detailPic.style.transform = `scale(${picRant + 1})`
    },
    goBack() {
      window.history.back();
    }
  },
  created(){
    this.$emit('setLoadingTrue')
  }
}
</script>

<style lang="less" scoped>
.full_box {
  overflow-x: hidden;
}

.detail_head {
  display: flex;
  position: fixed;
  left: 0;
}

.detail_head_pic {
  flex: 1;
}

img {
  width: 100vw; // transition: all .5s linear;
}

.list_des {
  position: relative;
  padding: 0 .4rem .4rem;
  background-color: #fff;
}

// 动画
.fade-enter-active {
  transition: all .2s;
}

.fade-leave-active {
  transition: all .2s;
  transform: translate3d(0, 30%, 0);
  opacity: 0;
}

.fade-enter {
  transform: translate3d(0, 30%, 0);
  opacity: 0;
}

.loading_wrap {
  top: 40px;
}
</style>

