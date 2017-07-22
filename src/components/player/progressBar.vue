<template>
  <div class="progress_bar">
    <!-- 左已播放时间  -->
    <div class="played_time">
      {{ playedTime }}
    </div>
    <!-- 中 进度条  -->
    <div class="progress_bar_cont" ref="progressBar" @click="barTouchPercent">
      <!-- 已播放时间的进度条  -->
      <div class="played_progress" :style="{width: barWidth}" ref="playedProgress"></div>
      <!-- 播放圆形按钮  -->
      <div class="progress_btn" ref="progressBtn" @touchstart.prevent="btnTouchStart" @touchmove.prevent="btnTouchMove" @touchend.prevent="btnTouchEnd"></div>
      <!-- 歌曲缓冲百分比
        <div></div> -->
    </div>
    <!-- 右 歌曲总时长  -->
    <div class="total_time">
      {{ totalTime }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 已播放时间 
    playedTime: {
      type: String,
      default: '00:00'
    },
    // 歌曲总时长
    totalTime: {
      type: String,
      default: '00:00'
    },
    // 播放长度
    percent: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      barWidth: '0px',
      progressWidth: '',
      currentPercent: 0,
      // 存储移动过程中的数据
      touchData: {},
      // 拖动比例
      dragPercent: 0
    }
  },
  watch: {
    percent() {
      // 托等进度条时不进行进度条值传递
      if (this.touchData.dataState) return
      // 获取进度条宽度
      this.getWidth()
      this.currentPercent = this.percent
      this.barWidth = `${Math.floor(this.progressWidth * this.currentPercent)}px`
    }
  },
  methods: {
    // 获取移除小球后的实际宽度
    getWidth() {
      const oBtn = this.$refs.progressBtn
      const oBar = this.$refs.progressBar
      this.progressWidth = oBar.clientWidth - oBtn.clientWidth
    },
    // 开始拖动滚动条
    btnTouchStart(ev) {
      // 初始化touchData数据，移动需要的全部数据
      this.touchData.dataState = true
      // 获取当前播放条进度的宽度
      this.touchData.barInitWidth = this.$refs.playedProgress.clientWidth
      // 获取初始位置
      this.touchData.initX = ev.touches[0].pageX
    },
    // 拖动滚动条中
    btnTouchMove(ev) {
      // 判断数据是否存储
      if (!this.touchData.dataState || !this.progressWidth) return
      // 获取移动中的位置
      let disX = ev.touches[0].pageX - this.touchData.initX
      // 拖动距离
      disX = Math.min(this.progressWidth, Math.max(0, this.touchData.barInitWidth + disX))
      this.setDragPercent(disX)
      // 计算拖动后的播放位置
      this.barWidth = `${disX}px`
    },
    // 结束拖动滚动条
    btnTouchEnd(ev) {
      // 清空touchData数据
      this.touchData.dataState = false
      this.sendDragPercent()
    },
    sendDragPercent() {
      // 将dragPercent派发出去
      this.$emit('dragPercentChange', this.dragPercent)
    },
    // 根据移动距离设置拖拽比例
    setDragPercent(offsetX) {
      // 计算拖动比例
      this.dragPercent = Math.floor(offsetX / this.progressWidth * 100)
    },
    // 点击滚动条叨叨对应的百分比值 
    barTouchPercent(ev) {
      this.setDragPercent(Math.min(ev.offsetX, this.progressWidth))
      this.sendDragPercent()
    }
  }
}
</script>

<style lang="less">
.progress_bar {
  padding: 0 1rem;
  display: flex;
  color: #fff;
  font-size: 12px;
  height: 12px;
  align-items: center;
}

.progress_bar_cont {
  position: relative;
  margin: 0 .2rem;
  flex: 1;
  height: 2px;
  background-color: rgba(173, 173, 173, .5);
  border-radius: 2px;
  display: flex;
  align-items: center;
}

.played_progress {
  height: 2px;
  background-color: #d43c33;
}

.progress_btn {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #fff;
}
</style>

