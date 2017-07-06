<template>
  <div class="loading_wrap">
    <div class="loading">
      <img src="../../assets/images/loading_lg.png">
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
    }
  }
}
</script>

<style lang="less">
.loading_wrap {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.loading {
  transform: translateY(35vh)
}
</style>

