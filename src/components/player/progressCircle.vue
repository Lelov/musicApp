<template>
  <svg width="32" height="32" class="progress_circle" xmlns="http://www.w3.org/2000/svg" version="1.1">
    <circle cx="16" cy="16" r="14" fill="transparent" stroke="red" stroke-width="2" stroke-dasharray="100" :stroke-dashoffset="strokePercent" />
  </svg>
</template>

<script>
export default {
  props: {
    strokePercent: {
      type: Number,
      default: 100
    }
  }
}
</script>

<style scoped>
.progress_circle {
  position: absolute;
  left: 0;
  top: 4px;
  z-index: -1;
}
.progress_circle circle{
  transform: rotate(-90deg);
  transform-origin: center;
}
</style>

