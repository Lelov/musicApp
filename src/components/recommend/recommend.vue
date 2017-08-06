<template>
  <div class="wrap">
    <div class="recommend">
      <div class="silder">
        <swiper :options="swiperOption" ref="mySwiper">
          <!-- slides -->
          <swiper-slide v-for="(item,index) in focusArr" :key="index">
            <img :src="item.picUrl">
          </swiper-slide>
          <!-- Optional controls -->
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
      <!-- 歌单 -->
      <div class="reco_list">
        <div class="reco_list_title" @click="goPlaylist">
          <areaTitle areaName="歌单"></areaTitle>
        </div>
        <div class="reco_list_wrap" v-show="!isLoading">
          <song-item v-for="(item,index) in recoList" :listDes="item.playCount | toW" :listName="item.name" :key="index" :listId="item.id">
            <img v-lazy="item.coverImgUrl" slot="listBg">
          </song-item>
        </div>
        <loading v-if="isLoading"></loading>
      </div>
    </div>
  </div>
</template>

<script>
import { getRecommendApi } from 'api/recommend'
import { ERR_OK } from 'api/apiCommon'
import SongItem from 'components/common/songItem'
import AreaTitle from 'components/common/areaTitle'
import Loading from 'components/common/loading'

export default {
  components: {
    SongItem,
    AreaTitle,
    Loading
  },
  filters: {
    toW(val) {
      // 处理播放次数,大于 5位数显示为多少万,否则正常显示
      let len = (val + '').split('')
      val = len.length > 5 ? len.splice(0, len.length - 4).join('') + '万' : val + ''
      return val
    }
  },
  data() {
    return {
      isLoading: true,
      focusArr: [],
      recoList: [],
      // swiper设置参数
      swiperOption: {
        notNextTick: true,
        autoplay: 3000,
        grabCursor: true,
        setWrapperSize: true,
        autoHeight: true,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        mousewheelControl: true,
        observeParents: true,
        loop: true
      },
      jiashujuArr: {
        code: 0,
        subcode: 0,
        message: '',
        default: 0,
      }
    }
  },
  mounted() {
    // 获取页面数据
    this.getRecommend()

    this.getRecoList();
    // 设置loading图,至少显示1500毫秒且当获取数据成功后取消loading图
    setTimeout(() => {
      const timer = window.setInterval(() => {
        if (this.recoList.length > 1) {
          this.isLoading = false
          clearInterval(timer)
        }
      }, 30)
    }, 500)
  },
  methods: {
    getRecommend() {
      // 获取轮播图数据
      getRecommendApi().then((req) => {
        if (ERR_OK === 0) {
          this.focusArr = req.data.slider
        }
      })
    },
    getRecoList() {
      // 获取推荐歌单
      this.$http.get('http://musicapi.duapp.com/api.php?type=topPlayList&cat=%E5%85%A8%E9%83%A8&offset=0&limit=9')
        .then(res => {
          this.recoList = res.data.playlists
        })
        .catch(err => {
          document.querySelector('.reco_list').innerHTML = '网络连接错误'
        })
    },
    // 转到歌单页
    goPlaylist() {
      this.$router.push('/playlist')
    }
  }
}
</script>

<style lang='less' scoped>
img {
  width: 100%;
  height: 100%;
  display: block;
}

.reco_list_wrap {
  display: flex;
  position: relative;
  overflow: auto;
  justify-content: space-around;
  flex-wrap: wrap;
}

.song_item {
  width: 32%;
}
</style>
