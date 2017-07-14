<template>
  <div class="go_back" :style="{backgroundColor:bgColor,height:h}">
    <img @click="goBack" src="../../assets/images/back_icon.png" alt="返回" height="28">
    <div class="msg">
      <p class="title">{{ title }}</p>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: ''
    },
    bgColor: {
      type: String,
      default: 'rgb(212, 60, 51)'
    },
    h: {
      type: String,
      default: '40px'
    }
  },
  methods: {
    goBack() {
      window.history.back();
    }
  }
}
</script>

<style lang="less" scoped>
.go_back {
  position: fixed;
  top: 0;
  width: 100vw;
  left: 0;
  background-color: #d43c33;
  font-size: 48px;
  display: flex;
  align-items: center;
  z-index: 101
}

.msg {
  flex: 1;
  color: #fff;
  font-size: 12px;
}
</style>

