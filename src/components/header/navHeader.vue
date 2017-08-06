<template>
  <div class="header_title">
    <div class="app_name">Music App</div>
  </div>
</template>

<script>
</script>

<style scoped lang="less">
@import '../../less/style.less';

.header_title {
  height: 50px;
  background-color: @themeBaseBGColor;
  color: @themeBaseTxtColor;
  padding: 0 .2rem;
  display: flex;
  align-items: center;
}

.app_name {
  flex: 1;
}
</style>
