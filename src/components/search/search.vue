<template>
  <div class="search" @click="show">
    <div class="top">
      <input type="text" placeholder="搜索音乐" v-model="queryVal" @keyup.13="startSearch">
      <div class="x_pic" v-show="queryVal !== ''" @click.stop="queryVal = ''"></div>
    </div>
    <div class="searh_type" v-show="showSearhType">
      <div :class="{ ac:searchType === 1 }" @click=" searchType = 1 ">单曲</div>
      <div :class="{ ac:searchType === 10 }" @click=" searchType = 10 ">专辑</div>
      <div :class="{ ac:searchType === 1000 }" @click=" searchType = 1000 ">歌单</div>
    </div>
    <div class="search_loading_wrap" v-show="isLoading">
      <loading></loading>
    </div>
    <div v-show="errState" class="err_state">未找到与“{{ errTxt }}”相关内容</div>
    <div class=" search_list " v-show="queryReslut.length > 0">
      <div class="search_list_cont ">
        <div v-for="(item,index) in queryReslut " :key="index " class="item " @click="dealItem(item,item.id,index)">
          <div class="item_pic" v-show="item.pic">
            <img v-lazy="item.pic" />
          </div>
          <div class="item_info">
            <div class="song_name ">
              <span v-show="item.songName">
                {{ item.songName }}
              </span>
              <span v-show="!item.songName">
                {{ item.name }}
              </span>
            </div>
            <div class="ar_name ">
              {{ item.arName }}
              <span v-show="item.songName">
                - {{ item.alName }}
              </span>
              <span v-show="item.trackCount" class="track_count">
                {{ item.trackCount }}首 播放{{ item.playCount }}次
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import goBack from '../common/goBack'
import search from '../../common/js/search'
import { mapGetters, mapMutations } from 'vuex'
import Loading from '../common/loadingb'

export default {
  components: {
    goBack,
    Loading
  },
  data() {
    return {
      queryVal: '',
      queryReslut: [],
      searchType: 1,
      showSearhType: false,
      errState: false,
      errTxt: '',
      isLoading: false
    }
  },
  computed: {
    ...mapGetters([
      'playingList'
    ])
  },
  watch: {
    searchType() {
      this.startSearch()
    }
  },
  methods: {
    dealItem(item, listId) {
      switch (this.searchType) {
        case 1:
          this.addToPlayingList(item)
          break;
        case 10:
          this.setToPlaylist(listId, 10)
          break;
        case 1000:
          this.setToPlaylist(listId, 1000)
          break;
      }
    },
    setToPlaylist(listId) {
      this.setPlayList('')
      // 获取播放列表详细小心
      this.getPlayListDes(listId)
      // 路由导向 播放列表
      this.$router.push({
        path: '/playList/id=' + listId
      })
    },
    getPlayListDes(listId, type) {
      // 根据type获取
      const url = type === 10
        ? `https://api.imjad.cn/cloudmusic/?type=playlist&id=${listId}`
        : `https://api.imjad.cn/cloudmusic/?type=album&id=${listId}`
      // 请求数据
      this.$http.get(url).then((res) => {
        if (res.status !== 200) return
        // 获取响应文本
        const listData = JSON.parse(res.request.responseText)
        let arr = {}
        if (listData.playlist) {
          // 处理歌单
          arr = listData.playlist
        } else {
          // 处理专辑
          const msg = res.data.album
          arr.coverImgUrl = msg.picUrl
          arr.pic = msg.picUrl
          arr.name = msg.name
          arr.id = msg.id
          arr.tracks = res.data.songs
        }
        //设置歌单列表
        this.setPlayList(arr)
      })
    },
    startSearch() {
      this.errState = false
      this.isLoading = this.showSearhType = true
      this.queryReslut = []
      // 查询值为空不允许查询
      if (this.queryVal === '') return
      search(this.queryVal, this.searchType).then(res => {
        // 处理搜索失败
        if (res === 0) {
          this.errState = true
          this.errTxt = this.queryVal
          return
        }
        this.isLoading = false
        this.queryReslut = res
      })
    },
    addToPlayingList(item) {
      // 处理的播放列表
      const arr = this.playingList
      // 将当前歌曲添加到播放列表
      this.addSong(item)
      // 设置正序播放列表
      this.setOrderPlayList(JSON.parse(JSON.stringify(arr)))
      this.setPlayingSongIndex(this.playingList.length - 1)
    },
    show() {
      // console.log(this.playingList)
    },
    ...mapMutations({
      addSong: 'SET_ADDSONG',
      setPlayingSongIndex: 'SET_PLAYINGSONGINDEX',
      setOrderPlayList: 'SET_ORDERPLAYLIST',
      setPlayList: 'SET_PLAYLIST'
    })
  }
}
</script>

<style lang="less" scoped>
.search {
  display: flex;
  flex-direction: column;
  position: relative;
}

.top {
  padding-top: 10px;
  display: flex;
  position: relative;
}

.top input {
  border-bottom: 1px solid #d43c33;
  padding: 0 25px 0 10px;
  height: 30px;
  flex: 1
}

.searh_type {
  display: flex;
}

.searh_type>div {
  flex: 1;
  padding: 8px 0;
}

.x_pic {
  position: absolute;
  top: 18px;
  right: 10px;
  height: 15px;
  width: 15px;
  background: url('../../assets/images/x.png') center no-repeat #fff;
  background-size: cover;
}

.item {
  margin: 0 8px;
  text-align: left;
  display: flex;
}

.search_loading_wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
}

.search_list {
  padding-top: 10px;
  overflow: auto;
  flex: 1;
  position: fixed;
  top: 160px;
  bottom: 50px;
  width: 100%;
}

.search_list::-webkit-scrollbar {
  width: 2px;
  display: block;
}

.err_state {
  padding: 40px 10px;
}

.song_name {
  padding-bottom: 3px;
}

.song_name span {
  font-size: 14px;
  font-weight: 800;
}

.ar_name {
  font-size: 12px;
}

.item_pic {
  padding: 4px 8px 4px 0;
}

.item_pic img {
  height: 50px;
  width: 50px;
  display: flex;
}

.item_info {
  border-bottom: 1px solid rgba(200, 200, 200, .5);
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 4px 0;
}

.item_info>div {
  line-height: 1.3;
}

.track_count {
  color: rgba(146, 146, 146, .9)
}

.ac {
  color: #d43c33;
}
</style>
