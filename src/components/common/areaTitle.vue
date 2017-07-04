<template lang="html">
  <div class="area_title">
    {{ areaName }} >
  </div>
</template>

<script>
export default {
  props: {
    areaName: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../less/style.less';
.area_title{
  margin: 12px 0;font-size: 14px;border-left: 3px solid @themeBaseBGColor;text-align: left;padding-left: 5px;font-weight: 500;
}
</style>
