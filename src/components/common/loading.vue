<template>
  <div class="loading_wrap">
    <div class="loading">
      <img src="../../assets/images/loading_lg.png" class="loading_img">
      <div>{{ loadingMsg }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    loadingMsg: {
      type: String,
      default: '载入中...'
    },
    // 控制载入的显示状态
    loadingState: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="less">
.loading_wrap {
  position: fixed;
  width: 100%;
  top: 50px;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  z-index: 10000
}

.loading_img {
  animation: itemRotate 2s infinite linear;
}
</style>

