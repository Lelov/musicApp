<template lang="html">
  <div class="song_item" @click="goDetail">
    <div class="song_item_bg">
      <div class="list_des">
        <img src="../../assets/images/vv.png"><span>{{ listDes }}</span>
      </div>
      <slot name="listBg"></slot>
    </div>
    <div class="list_name">
      {{ listName }}
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  props: {
    // 评论数量
    listDes: {
      type: String,
      default: 0
    },
    // 歌单名称
    listName: {
      type: String,
      default: '歌单'
    },
    // 歌单id
    listId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      // 记录上次播放id
      lastId: 0,
      defaultPlayList: {
        coverImgUrl: require('../../assets/images/lazy.png'),
        tracks: [
          {
            name: '',
            id: 0,
            al: {
              name: ''
            },
            ar: [
              {
                name: ''
              }
            ]
          }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'playList'
    ])
  },
  methods: {
    goDetail() {
      // 派发事件，详情页开启加载动画
      this.$on('setLoadingTrue', true)
      // 获取歌单数据
      this.getPlayListDes()
      // 显示歌单详情页
      const listId = this.listId
      this.$router.push({
        path: '/playList/id=' + listId
      })
    },
    getPlayListDes() {
      // 设置默认播放列表
      this.setPlayList(this.defaultPlayList)
      // 根据 id 获取页面数据
      const url = 'https://api.imjad.cn/cloudmusic/?type=playlist&id='
      this.$http.get(url + this.listId).then((res) => {
        if (res.status !== 200) return
        const listData = JSON.parse(res.request.responseText)
        console.log(listData.playlist)
        //设置歌单列表
        this.setPlayList(listData.playlist)
        // 派发事件，详情页开启加载动画
        this.$on('setLoadingFalse', false)
      })
    },
    ...mapMutations({
      setPlayList: 'SET_PLAYLIST'
    })
  }
};
</script>

<style lang="less" scoped>
.song_item_bg {
  position: relative;
  background-color: rgba(142, 142, 142, .2);
}

img {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  z-index: -1;
}

.list_des {
  position: absolute;
  top: 0;
  right: 0;
  color: #fff;
  text-align: right;
  padding: 3px;
  height: 14px;
  display: flex;
}

.list_des img {
  width: 12px;
  height: 12px;
  padding: 1px 3px 0 0;
}

.list_name {
  line-height: 1.5;
  padding: 5px 2px 15px;
  font-size: 12px;
  text-align: left;
}
</style>
