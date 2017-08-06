<template>
  <div class="nav">
    <router-link tag="div" class="nav_link" v-for="(item,index) in linkName" :to="item.path" :key="index">
      <div>
        {{ item.name }}
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      linkName: [
        {
          name: '个人',
          path: '/mine'
        },
        {
          name: '推荐',
          path: '/recommend'
        },
        {
          name: '歌单',
          path: '/playlist'
        },
        {
          name: '搜索',
          path: '/search'
        }
      ]
    }
  }
}
</script>

<style scoped lang="less">
@import '../../less/style.less';
.nav {
  display: flex;
}

.nav {
  justify-content: space-between;
}

.nav_link {
  flex-grow: 1;
  border-bottom: 2px solid transparent;
  font-weight: 600;
  height: 40px;
  line-height: 40px;
}

div.router-link-active {
  color: @themeBaseBGColor;
  border-color: @themeBaseBGColor;
}
</style>
