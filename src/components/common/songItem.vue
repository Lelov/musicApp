<template lang="html">
  <div class="song_item">
    <div class="song_item_bg">
      <div class="list_des">
        <img src="../../assets/images/vv.png"><span>{{ listDes }}</span>
      </div>
      <slot name="listBg"></slot>
      <div class="list_author">
        {{ listAuthor }}
      </div>
    </div>
    <div class="list_name">
      {{ listName }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 评论数量
    listDes: {
      type: String,
      default: 0
    },
    // 作者:用户名
    listAuthor: {
      type: String,
      default: '网易云音乐'
    },
    // 歌单名称
    listName: {
      type: String,
      default: '歌单'
    }
  }
};
</script>

<style lang="less" scoped>
.song_item{
  width: 32%;
}
.song_item_bg{
  position: relative;
}
img{
  width: 100%;height: 100%;
}
.list_des{
  position: absolute;top: 0;right: 0;color: #fff;text-align: right;padding: 3px;height: 14px;display: flex;
}
.list_des img{width: 12px;height:12px;padding: 1px 3px 0 0;}
.list_author{
  position: absolute;bottom: 0;color: #fff;font-size: 12px;margin: 0 0 4px 4px;text-align: left;height: 12px;overflow: hidden;
}
.list_name{
 line-height: 1.5;padding: 5px 2px 15px;font-size: 12px;text-align: left;
}
</style>
