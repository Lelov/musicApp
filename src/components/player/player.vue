<template lang="html">
  <div class="player">
    <div class="full" v-show="isFull">
      全屏播放器
    </div>
    <div class="mini" v-show="!isFull">
      迷你播放器
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isFull: true
    }
  }
}
</script>

<style lang="less" scoped>
.player{
 color: #ccc;position: fixed;width: 100%;height:100%;background-color: #fff;top: 0;z-index: 1000;
}
.full{
  height: 100%;width: 100%;
}
</style>
