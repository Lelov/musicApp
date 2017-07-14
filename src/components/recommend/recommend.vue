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
        data: {
          focus: [
            {
              fid: '10655',
              id: '004fKlmI2wlhwF',
              jumpurl: '',
              pic: 'http://y.gtimg.cn/music/common/upload/t_focus_info_iphone/115098.jpg',
              title: '杨宗纬《闪光少女》',
              type: 10002
            },
            {
              fid: '10757',
              id: 'https://c.y.qq.com/r/cIye?id=2094880&g_f=yqqjiaodian',
              jumpurl: 'https://c.y.qq.com/r/cIye?id=2094880&g_f=yqqjiaodian',
              pic: 'http://y.gtimg.cn/music/common/upload/t_focus_info_iphone/115024.jpg',
              title: 'YQQ 最佳一击OST3数专正售',
              type: 3002
            },
            {
              fid: '10658',
              id: '003TIuTU1MJ4eP',
              jumpurl: '',
              pic: 'http://y.gtimg.cn/music/common/upload/mv_t_mv_focus/112708.jpg',
              title: 'PC+YQQ 中国有嘻哈第二期',
              type: 10002
            },
            {
              fid: '10645',
              id: '004SyvBP10R2my',
              jumpurl: '',
              pic: 'http://y.gtimg.cn/music/common/upload/t_focus_info_iphone/114948.jpg',
              title: 'PC+YQQ 明日之子第4期',
              type: 10002
            },
            {
              fid: '10641',
              id: '002beEI928Ap0x',
              jumpurl: '',
              pic: 'http://y.gtimg.cn/music/common/upload/t_focus_info_iphone/115291.jpg',
              title: '歌声的翅膀第十一期',
              type: 10002
            },
            {
              fid: '10754',
              id: '002Rsqih3ntVsu',
              jumpurl: '',
              pic: 'http://y.gtimg.cn/music/common/upload/t_focus_info_iphone/115093.jpg',
              title: '超强音浪 黄绮珊',
              type: 10002
            },
            {
              fid: '10608',
              id: 'https://y.qq.com/n/yqq/mv/c/ybz16v5c34ii9k4.html',
              jumpurl: 'https://y.qq.com/n/yqq/mv/c/ybz16v5c34ii9k4.html',
              pic: 'http://y.gtimg.cn/music/common/upload/t_focus_info_iphone/113435.jpg',
              title: '2017剧MV',
              type: 3002
            }
          ],
          hotdiss: {
            list: [
              {
                author: 'QQ音乐综艺',
                dissid: '1760101682',
                dissname: '跨界歌王2 | 原唱收集',
                imgurl: 'http://p.qpic.cn/music_cover/JBDCVgqXWXaYUvcsElqcicXthHDxnKMtne5UElOib7IwE0nQc7OF6XYA/300?n=1',
                listennum: 22781683,
                sum: 0
              },
              {
                author: '旺福',
                dissid: '2061931644',
                dissname: '放暑假了！想好和女朋友去哪里旅游了吗？',
                imgurl: 'http://p.qpic.cn/music_cover/cYRuhwRAKVibF1dxSVBgbj5ztf3Jaqsmdlh7mtyIUvfUhcu1dibjFeWA/300?n=1',
                listennum: 814525,
                sum: 0
              },
              {
                author: '囡_囡',
                dissid: '1168674479',
                dissname: '小众乡村：蓝草音乐哼起来都特别洋气',
                imgurl: 'http://p.qpic.cn/music_cover/sWA3LW2gwfzp5NmpPAp4syg9l7USCvUibPPh0RkdjB7o5ib92e2UcJeA/300?n=1',
                listennum: 35540,
                sum: 0
              },
              {
                author: 'QQ音乐独家',
                dissid: '2066248632',
                dissname: '陪你听全世界丨让音乐的律动带你放肆一夏',
                imgurl: 'http://p.qpic.cn/music_cover/1ZdGl7wveVA1a9fU8FWwvFwfg1XHBB1jUrys2t74b3wSB8RU2nfueA/300?n=1',
                listennum: 6515,
                sum: 0
              },
              {
                author: '〇',
                dissid: '1469964663',
                dissname: '精选百首电子丨假日狂欢夜，开启入魔状态',
                imgurl: 'http://p.qpic.cn/music_cover/tWSKa45FrmUiboG8aUD8Ro4R0qhDonhnnXCxpwqU6lRCPQ2yy6xN2nw/300?n=1',
                listennum: 432737,
                sum: 0
              },
              {
                author: '猪仔',
                dissid: '3569252704',
                dissname: '原来大幂幂主演过这么多热门影视作品',
                imgurl: 'http://p.qpic.cn/music_cover/gLEaX9CQ359WL2slRClicyRL4PJ6miaRJSB7B3an8g4PIzXeaF3SmSrw/300?n=1',
                listennum: 244256,
                sum: 0
              },
              {
                author: 'Vitamin',
                dissid: '1768980761',
                dissname: '距离一个吻的冲动，你只差这些歌',
                imgurl: 'http://p.qpic.cn/music_cover/2g8aJznERGdXrFRjaqmCHJYicHoe3ib6pKUqNicVBeib8KpwNxUZu2fjSA/300?n=1',
                listennum: 33233,
                sum: 0
              },
              {
                author: '不简单',
                dissid: '2666492707',
                dissname: '华语深情｜在我面前，你可以不用坚强！',
                imgurl: 'http://p.qpic.cn/music_cover/Z03rf9FYedjYl67Xq9LnE9l8uXlwrczb4FPd0qVoUia6EicjDjMbib7bg/300?n=1',
                listennum: 39677,
                sum: 0
              },
              {
                author: '掌心薔薇開',
                dissid: '1164541283',
                dissname: '韩语小情歌，意乱情迷R&B节奏',
                imgurl: 'http://p.qpic.cn/music_cover/e8Jvd83AZrRbhqofb1ES4KZHDmhMzzQKKsfGtXGGLeUpNdq2iahfzJw/300?n=1',
                listennum: 135664,
                sum: 0
              },
              {
                author: '肥喵',
                dissid: '1768853755',
                dissname: '如果我是一条咸鱼，那也是一条会蹦迪的咸鱼',
                imgurl: 'http://p.qpic.cn/music_cover/XMPAjfs5uwGZdWII3osvAqann0q0C4ZL60F3mLiclLAsS1iaFyYDl0Ew/300?n=1',
                listennum: 75115,
                sum: 0
              },
              {
                author: '弓长',
                dissid: '873879862',
                dissname: '前卫摇滚最伟大的70张唱片',
                imgurl: 'http://p.qpic.cn/music_cover/9FFOSC3NnCw42Dx1kQ7CuoEFSqydzlz6ahFd5G1Jcpic5q28Ws0l0Dw/300?n=1',
                listennum: 47697,
                sum: 0
              },
              {
                author: 'QQ音乐人',
                dissid: '2371682285',
                dissname: '那个年代的民谣，你还有在听吗？',
                imgurl: 'http://p.qpic.cn/music_cover/qTKgAXria5IC0DIibN2H9EiakLfo3QrxUdcfqzvdPq6icIShYLVWoBfcYg/300?n=1',
                listennum: 15908,
                sum: 0
              }
            ],
            sum: 12
          },
          shoubomv: {
            all: [
              {
                listennum: 17727,
                mv_id: 1338130,
                mvdesc: '果然夏日还是不能没有孝琳',
                mvscore: 0,
                mvtitle: 'FRUITY',
                picurl: 'http://puui.qpic.cn/qqvideo/0/u0024d1buts/0',
                pub_date: '2017-06-29',
                singer_id: 28894,
                singer_mid: '003XGKPF3lw4Nc',
                singer_name: '효린',
                vid: 'u0024d1buts'
              },
              {
                listennum: 971315,
                mv_id: 1338129,
                mvdesc: '笔笔执导，杨幂出演秒落泪',
                mvscore: 0,
                mvtitle: '无 所 事 事',
                picurl: 'http://puui.qpic.cn/qqvideo/0/c00243x2qkd/0',
                pub_date: '2017-06-30',
                singer_id: 4610,
                singer_mid: '004HlS192u9J5g',
                singer_name: '周笔畅',
                vid: 'c00243x2qkd'
              },
              {
                listennum: 61353,
                mv_id: 1338155,
                mvdesc: '李孝利终于要回归，美炸了！',
                mvscore: 0,
                mvtitle: 'Seoul',
                picurl: 'http://puui.qpic.cn/qqvideo/0/t0024j6dwqs/0',
                pub_date: '2017-06-29',
                singer_id: 5439,
                singer_mid: '004MARM80Vfqr9',
                singer_name: '이효리',
                vid: 't0024j6dwqs'
              },
              {
                listennum: 75360,
                mv_id: 1338216,
                mvdesc: '“通关”的畅快之感展露无遗',
                mvscore: 0,
                mvtitle: '通关 (QQ三国十周年主题曲)',
                picurl: 'http://puui.qpic.cn/qqvideo/0/z00242a3kpw/0',
                pub_date: '2017-06-30',
                singer_id: 7221,
                singer_mid: '000CK5xN3yZDJt',
                singer_name: '许嵩',
                vid: 'z00242a3kpw'
              },
              {
                listennum: 31640,
                mv_id: 1338043,
                mvdesc: '香港回归20周年主题曲',
                mvscore: 0,
                mvtitle: '香港·我家',
                picurl: 'http://puui.qpic.cn/qqvideo/0/y0024il4ej0/0',
                pub_date: '2017-06-28',
                singer_id: 4423,
                singer_mid: '000vYUqh1SqjQQ',
                singer_name: '华语群星',
                vid: 'y0024il4ej0'
              },
              {
                listennum: 19691,
                mv_id: 1337903,
                mvdesc: '两个女生哪个才是现任女友？',
                mvscore: 0,
                mvtitle: '现任朋友',
                picurl: 'http://puui.qpic.cn/qqvideo/0/v0024bpk04g/0',
                pub_date: '2017-06-28',
                singer_id: 1171873,
                singer_mid: '000quag73Rfu0i',
                singer_name: 'JC',
                vid: 'v0024bpk04g'
              },
              {
                listennum: 23730,
                mv_id: 1337601,
                mvdesc: '高晓松作曲，MV画面引人遐想',
                mvscore: 0,
                mvtitle: '昨天涯——献给布宜诺斯艾利斯',
                picurl: 'http://puui.qpic.cn/qqvideo/0/k0024q2tk2z/0',
                pub_date: '2017-06-28',
                singer_id: 5979,
                singer_mid: '000we89k1hzBcA',
                singer_name: '谭维维',
                vid: 'k0024q2tk2z'
              },
              {
                listennum: 5686,
                mv_id: 1338050,
                mvdesc: '一场治愈的自我对话',
                mvscore: 0,
                mvtitle: '你离开他了吗',
                picurl: 'http://puui.qpic.cn/qqvideo/0/j0024ish1xn/0',
                pub_date: '2017-06-29',
                singer_id: 12444,
                singer_mid: '001YzayJ1iMus1',
                singer_name: '曾沛慈',
                vid: 'j0024ish1xn'
              }
            ],
            gangtai: [
              {
                listennum: 19691,
                mv_id: 1337903,
                mvdesc: '两个女生哪个才是现任女友？',
                mvscore: 0,
                mvtitle: '现任朋友',
                picurl: 'http://puui.qpic.cn/qqvideo/0/v0024bpk04g/0',
                pub_date: '2017-06-28',
                singer_id: 1171873,
                singer_mid: '000quag73Rfu0i',
                singer_name: 'JC',
                vid: 'v0024bpk04g'
              },
              {
                listennum: 5686,
                mv_id: 1338050,
                mvdesc: '一场治愈的自我对话',
                mvscore: 0,
                mvtitle: '你离开他了吗',
                picurl: 'http://puui.qpic.cn/qqvideo/0/j0024ish1xn/0',
                pub_date: '2017-06-29',
                singer_id: 12444,
                singer_mid: '001YzayJ1iMus1',
                singer_name: '曾沛慈',
                vid: 'j0024ish1xn'
              },
              {
                listennum: 6135,
                mv_id: 1337354,
                mvdesc: '爱情长跑的情侣都有共鸣',
                mvscore: 0,
                mvtitle: '习惯爱你',
                picurl: 'http://puui.qpic.cn/qqvideo/0/r00248mqe2o/0',
                pub_date: '2017-06-28',
                singer_id: 6378,
                singer_mid: '002mbmmr4LL8Ef',
                singer_name: '泳儿',
                vid: 'r00248mqe2o'
              },
              {
                listennum: 2081253,
                mv_id: 1306436,
                mvdesc: '揭开“浅川三美”的遗憾与美好',
                mvscore: 0,
                mvtitle: '最初的记忆 (《夏至未至》电视剧片尾曲)',
                picurl: 'http://puui.qpic.cn/qqvideo/0/u0023lw2kyp/0',
                pub_date: '2017-05-27',
                singer_id: 16244,
                singer_mid: '002LZVMH0zc8F4',
                singer_name: '徐佳莹',
                vid: 'u0023lw2kyp'
              },
              {
                listennum: 1126414,
                mv_id: 1319340,
                mvdesc: '好感人！立夏和小司的心动瞬间',
                mvscore: 0,
                mvtitle: '追光者 (《夏至未至》电视剧插曲)',
                picurl: 'http://puui.qpic.cn/qqvideo/0/z0024oj9ipu/0',
                pub_date: '2017-06-16',
                singer_id: 33680,
                singer_mid: '0037dNIC0n5pW8',
                singer_name: '岑宁儿',
                vid: 'z0024oj9ipu'
              },
              {
                listennum: 935670,
                mv_id: 1312257,
                mvdesc: '紫棋演绎中国风，唱颂唯美爱情',
                mvscore: 0,
                mvtitle: '桃花诺 (《上古情歌》电视剧片尾曲)',
                picurl: 'http://puui.qpic.cn/qqvideo/0/o00230ukvzb/0',
                pub_date: '2017-06-05',
                singer_id: 13948,
                singer_mid: '001fNHEf1SFEFN',
                singer_name: 'G.E.M. 邓紫棋',
                vid: 'o00230ukvzb'
              },
              {
                listennum: 4959128,
                mv_id: 1225945,
                mvdesc: '与超模又搂又亲分分钟心脏爆击',
                mvscore: 0,
                mvtitle: '着迷',
                picurl: 'http://puui.qpic.cn/qqvideo/0/f0023154wot/0',
                pub_date: '2017-05-08',
                singer_id: 13461,
                singer_mid: '000in2fg3O6W83',
                singer_name: '陈伟霆',
                vid: 'f0023154wot'
              },
              {
                listennum: 1700813,
                mv_id: 1216195,
                mvdesc: '听一次虐一次却还是听不够',
                mvscore: 0,
                mvtitle: '凉凉 (《三生三世十里桃花》电视剧片尾曲)',
                picurl: 'http://puui.qpic.cn/qqvideo/0/t0023webhcw/0',
                pub_date: '2017-04-05',
                singer_id: 11608,
                singer_mid: '003tMm0y0TuewY',
                singer_name: '杨宗纬',
                vid: 't0023webhcw'
              }
            ],
            japan: [
              {
                listennum: 2189,
                mv_id: 1337989,
                mvdesc: '樱花般粉嫩少女盛开的季节',
                mvscore: 0,
                mvtitle: 'リトルピ',
                picurl: 'http://puui.qpic.cn/qqvideo/0/z0024raenql/0',
                pub_date: '2017-06-29',
                singer_id: 201928,
                singer_mid: '003KhXln02zGlj',
                singer_name: 'Ange☆Reve',
                vid: 'z0024raenql'
              },
              {
                listennum: 28701,
                mv_id: 1318932,
                mvdesc: '《哥哥太爱我了怎么办》插曲',
                mvscore: 0,
                mvtitle: '空',
                picurl: 'http://puui.qpic.cn/qqvideo/0/e0024a03h51/0',
                pub_date: '2017-06-13',
                singer_id: 89485,
                singer_mid: '0003MDLK0AdFfz',
                singer_name: 'GENERATIONS from EXILE TRIBE',
                vid: 'e0024a03h51'
              },
              {
                listennum: 3475,
                mv_id: 1337389,
                mvdesc: '千万不要爱上小姐姐的舞蹈',
                mvscore: 0,
                mvtitle: 'water lily～睡蓮～',
                picurl: 'http://puui.qpic.cn/qqvideo/0/x0024kd3bqm/0',
                pub_date: '2017-06-25',
                singer_id: 21303,
                singer_mid: '004EmJtt103e1S',
                singer_name: '東京女子流',
                vid: 'x0024kd3bqm'
              },
              {
                listennum: 1577,
                mv_id: 1337557,
                mvdesc: '蓝色和花营造的纯净感让人心安',
                mvscore: 0,
                mvtitle: 'No Way Back',
                picurl: 'http://puui.qpic.cn/qqvideo/0/q0024xt8bmm/0',
                pub_date: '2017-06-26',
                singer_id: 6392,
                singer_mid: '000Gtvvm4JyP8x',
                singer_name: 'AAA',
                vid: 'q0024xt8bmm'
              },
              {
                listennum: 999,
                mv_id: 1337514,
                mvdesc: '女仆装摇滚，prprpr',
                mvscore: 0,
                mvtitle: 'Choose me',
                picurl: 'http://puui.qpic.cn/qqvideo/0/u00247sow1f/0',
                pub_date: '2017-06-26',
                singer_id: 964949,
                singer_mid: '0024YZdn17VLc5',
                singer_name: 'BAND-MAID',
                vid: 'u00247sow1f'
              },
              {
                listennum: 4576,
                mv_id: 1322580,
                mvdesc: '皮衣性感女特工超级反转',
                mvscore: 0,
                mvtitle: 'MONEY IN THE BANK',
                picurl: 'http://puui.qpic.cn/qqvideo/0/f0024o7ozfr/0',
                pub_date: '2017-06-21',
                singer_id: 181549,
                singer_mid: '001quxub0zhDh3',
                singer_name: '佐藤広大',
                vid: 'f0024o7ozfr'
              },
              {
                listennum: 6607,
                mv_id: 1319321,
                mvdesc: '又要养成一波萌妹子了',
                mvscore: 0,
                mvtitle: '桜色ダイアリー (《路人女主的养成方法♭》TV动画片尾曲)',
                picurl: 'http://puui.qpic.cn/qqvideo/0/p0024hrdd8j/0',
                pub_date: '2017-06-15',
                singer_id: 197843,
                singer_mid: '004ICwfw1lde3V',
                singer_name: '妄想キャリブレーション',
                vid: 'p0024hrdd8j'
              },
              {
                listennum: 25302,
                mv_id: 1231731,
                mvdesc: '小哥哥人帅，造型有点惊悚',
                mvscore: 0,
                mvtitle: '洗脳',
                picurl: 'http://puui.qpic.cn/qqvideo/0/s00237k7ut8/0',
                pub_date: '2017-05-10',
                singer_id: 9962,
                singer_mid: '000f1b6W1wzyRN',
                singer_name: 'RADWIMPS',
                vid: 's00237k7ut8'
              }
            ],
            korea: [
              {
                listennum: 61353,
                mv_id: 1338155,
                mvdesc: '李孝利终于要回归了，美炸了！',
                mvscore: 0,
                mvtitle: 'Seoul',
                picurl: 'http://puui.qpic.cn/qqvideo/0/t0024j6dwqs/0',
                pub_date: '2017-06-29',
                singer_id: 5439,
                singer_mid: '004MARM80Vfqr9',
                singer_name: '이효리',
                vid: 't0024j6dwqs'
              },
              {
                listennum: 17727,
                mv_id: 1338130,
                mvdesc: '果然夏日还是不能没有孝琳',
                mvscore: 0,
                mvtitle: 'FRUITY',
                picurl: 'http://puui.qpic.cn/qqvideo/0/u0024d1buts/0',
                pub_date: '2017-06-29',
                singer_id: 28894,
                singer_mid: '003XGKPF3lw4Nc',
                singer_name: '효린',
                vid: 'u0024d1buts'
              },
              {
                listennum: 5744,
                mv_id: 1337949,
                mvdesc: '面朝大海感叹夏日爱恋',
                mvscore: 0,
                mvtitle: 'Summer Love',
                picurl: 'http://puui.qpic.cn/qqvideo/0/s00248lns6b/0',
                pub_date: '2017-06-28',
                singer_id: 164859,
                singer_mid: '000iYmqU22mp2u',
                singer_name: '크러쉬',
                vid: 's00248lns6b'
              },
              {
                listennum: 2790,
                mv_id: 1338034,
                mvdesc: '日文版还是不想听伤心的歌',
                mvscore: 0,
                mvtitle: 'SAD SONG (日文版)',
                picurl: 'http://puui.qpic.cn/qqvideo/0/g0024b6jn03/0',
                pub_date: '2017-06-28',
                singer_id: 7979,
                singer_mid: '0031xKa50EwkMv',
                singer_name: 'SECHSKIES',
                vid: 'g0024b6jn03'
              },
              {
                listennum: 3948,
                mv_id: 1337950,
                mvdesc: '“站立蛋”清新悦耳的调调',
                mvscore: 0,
                mvtitle: '너라면 괜찮아',
                picurl: 'http://puui.qpic.cn/qqvideo/0/z0024ynbde9/0',
                pub_date: '2017-06-28',
                singer_id: 20975,
                singer_mid: '001EEjWH2L8qiJ',
                singer_name: '스탠딩 에그',
                vid: 'z0024ynbde9'
              },
              {
                listennum: 2967,
                mv_id: 1338005,
                mvdesc: '治愈系暖男中文十级妥妥地',
                mvscore: 0,
                mvtitle: '先幸福好吗? (Suddenly 中文版)(中字精华版)',
                picurl: 'http://puui.qpic.cn/qqvideo/0/d00242rcifz/0',
                pub_date: '2017-06-28',
                singer_id: 72221,
                singer_mid: '002GrZmi0rYeZS',
                singer_name: '로이킴',
                vid: 'd00242rcifz'
              },
              {
                listennum: 5604,
                mv_id: 1337896,
                mvdesc: '花式发糖再来一波',
                mvscore: 0,
                mvtitle: '너에겐 져버릴 거야',
                picurl: 'http://puui.qpic.cn/qqvideo/0/b00245klbhi/0',
                pub_date: '2017-06-28',
                singer_id: 72221,
                singer_mid: '002GrZmi0rYeZS',
                singer_name: '로이킴',
                vid: 'b00245klbhi'
              },
              {
                listennum: 4633,
                mv_id: 1338007,
                mvdesc: '暧昧期让人纠结到想哭',
                mvscore: 0,
                mvtitle: '울기 일보 직전 (中字版)',
                picurl: 'http://puui.qpic.cn/qqvideo/0/m0024ssrm36/0',
                pub_date: '2017-06-28',
                singer_id: 208216,
                singer_mid: '002Dlxpk1sgpLK',
                singer_name: '스텔라 장',
                vid: 'm0024ssrm36'
              }
            ],
            neidi: [
              {
                listennum: 971315,
                mv_id: 1338129,
                mvdesc: '笔笔执导，杨幂出演秒落泪',
                mvscore: 0,
                mvtitle: '无 所 事 事',
                picurl: 'http://puui.qpic.cn/qqvideo/0/c00243x2qkd/0',
                pub_date: '2017-06-30',
                singer_id: 4610,
                singer_mid: '004HlS192u9J5g',
                singer_name: '周笔畅',
                vid: 'c00243x2qkd'
              },
              {
                listennum: 75360,
                mv_id: 1338216,
                mvdesc: '“通关”的畅快之感展露无遗',
                mvscore: 0,
                mvtitle: '通关 (QQ三国十周年主题曲)',
                picurl: 'http://puui.qpic.cn/qqvideo/0/z00242a3kpw/0',
                pub_date: '2017-06-30',
                singer_id: 7221,
                singer_mid: '000CK5xN3yZDJt',
                singer_name: '许嵩',
                vid: 'z00242a3kpw'
              },
              {
                listennum: 34738,
                mv_id: 1337536,
                mvdesc: '各类古装扮相的萌萌哒天团',
                mvscore: 0,
                mvtitle: '飞舞 (《帝都公主传》电影插曲)',
                picurl: 'http://puui.qpic.cn/qqvideo/0/r00241knnpy/0',
                pub_date: '2017-06-28',
                singer_id: 943468,
                singer_mid: '003rJfMG3PPqWd',
                singer_name: '萌萌哒天团',
                vid: 'r00241knnpy'
              },
              {
                listennum: 23730,
                mv_id: 1337601,
                mvdesc: '高晓松作曲，MV画面引人遐想',
                mvscore: 0,
                mvtitle: '昨天涯——献给布宜诺斯艾利斯',
                picurl: 'http://puui.qpic.cn/qqvideo/0/k0024q2tk2z/0',
                pub_date: '2017-06-28',
                singer_id: 5979,
                singer_mid: '000we89k1hzBcA',
                singer_name: '谭维维',
                vid: 'k0024q2tk2z'
              },
              {
                listennum: 8725,
                mv_id: 1337768,
                mvdesc: '唯美歌姬阿兰重唱三国',
                mvscore: 0,
                mvtitle: '热血三国 (《热血三国》游戏同名主题曲)',
                picurl: 'http://puui.qpic.cn/qqvideo/0/v0024dq2jvr/0',
                pub_date: '2017-06-29',
                singer_id: 12303,
                singer_mid: '002RWWeo3IkUaj',
                singer_name: '阿兰',
                vid: 'v0024dq2jvr'
              },
              {
                listennum: 74518,
                mv_id: 1337687,
                mvdesc: '暖音少年谱写青春的末日恋曲',
                mvscore: 0,
                mvtitle: '昨夜以前的星光 (《夏至未至》电视剧推广曲)',
                picurl: 'http://puui.qpic.cn/qqvideo/0/z0024sqf7ie/0',
                pub_date: '2017-06-28',
                singer_id: 163666,
                singer_mid: '003vPqp50SrmFH',
                singer_name: '张阳阳',
                vid: 'z0024sqf7ie'
              },
              {
                listennum: 4826,
                mv_id: 1338247,
                mvdesc: '燃并暖！另类“绝世高手”',
                mvscore: 0,
                mvtitle: '绝世高手 (《绝世高手》电影同名主题曲)',
                picurl: 'http://puui.qpic.cn/qqvideo/0/d00245s8fzl/0',
                pub_date: '2017-06-30',
                singer_id: 4289,
                singer_mid: '002sfdNU1f3nHD',
                singer_name: '赵英俊',
                vid: 'd00245s8fzl'
              },
              {
                listennum: 12310,
                mv_id: 1337792,
                mvdesc: '谢帝跟你谈谈Freestyle精神',
                mvscore: 0,
                mvtitle: '请揣满人民币Freestyle',
                picurl: 'http://puui.qpic.cn/qqvideo/0/c0024cax333/0',
                pub_date: '2017-06-28',
                singer_id: 174439,
                singer_mid: '000vnpb73HKkEF',
                singer_name: '谢帝',
                vid: 'c0024cax333'
              }
            ],
            oumei: [
              {
                listennum: 3882,
                mv_id: 1337964,
                mvdesc: '这个造型我是拒接接受的',
                mvscore: 0,
                mvtitle: 'Without U',
                picurl: 'http://puui.qpic.cn/qqvideo/0/p002457q6t2/0',
                pub_date: '2017-06-28',
                singer_id: 23142,
                singer_mid: '003ihUzC1icy0O',
                singer_name: 'Steve Aoki',
                vid: 'p002457q6t2'
              },
              {
                listennum: 2704,
                mv_id: 1338143,
                mvdesc: '这是什么风格，有点舞狮的感觉',
                mvscore: 0,
                mvtitle: 'Hunter',
                picurl: 'http://puui.qpic.cn/qqvideo/0/l002447ejma/0',
                pub_date: '2017-06-29',
                singer_id: 159005,
                singer_mid: '003EVd0u4D4N6X',
                singer_name: 'Galantis',
                vid: 'l002447ejma'
              },
              {
                listennum: 3576,
                mv_id: 1338222,
                mvdesc: '强烈的异域风，嘻哈老炮',
                mvscore: 0,
                mvtitle: 'Mi Gente',
                picurl: 'http://puui.qpic.cn/qqvideo/0/s0024zq8v3q/0',
                pub_date: '2017-06-29',
                singer_id: 50169,
                singer_mid: '002dPZGE1MX2tG',
                singer_name: 'J Balvin',
                vid: 's0024zq8v3q'
              },
              {
                listennum: 1818,
                mv_id: 1338164,
                mvdesc: '这个色彩搭配简直大师级别',
                mvscore: 0,
                mvtitle: 'I Dare You',
                picurl: 'http://puui.qpic.cn/qqvideo/0/v0024o5le4f/0',
                pub_date: '2017-06-29',
                singer_id: 22941,
                singer_mid: '0006hKUC2vg6JD',
                singer_name: 'The xx',
                vid: 'v0024o5le4f'
              },
              {
                listennum: 2417,
                mv_id: 1338228,
                mvdesc: '还在狱中O.J是美国社会的悲剧',
                mvscore: 0,
                mvtitle: 'The Story Of O.J.',
                picurl: 'http://puui.qpic.cn/qqvideo/0/g0024envhqn/0',
                pub_date: '2017-06-30',
                singer_id: 2924,
                singer_mid: '000bFLxZ4GRBLA',
                singer_name: 'Jay-Z',
                vid: 'g0024envhqn'
              },
              {
                listennum: 3153,
                mv_id: 1304460,
                mvdesc: '有个带口罩的小可爱真是萌啊',
                mvscore: 0,
                mvtitle: 'Rolex',
                picurl: 'http://puui.qpic.cn/qqvideo/0/x0023wlo7l6/0',
                pub_date: '2017-06-30',
                singer_id: 1295218,
                singer_mid: '004aZMus1gYDvJ',
                singer_name: 'Ayo & Teo',
                vid: 'x0023wlo7l6'
              },
              {
                listennum: 2256,
                mv_id: 1337966,
                mvdesc: '全新面貌的回归带来惊喜',
                mvscore: 0,
                mvtitle: 'The Man',
                picurl: 'http://puui.qpic.cn/qqvideo/0/b0024bfyran/0',
                pub_date: '2017-06-28',
                singer_id: 8088,
                singer_mid: '000knqnm1Gggj0',
                singer_name: 'The Killers',
                vid: 'b0024bfyran'
              },
              {
                listennum: 1328,
                mv_id: 1338204,
                mvdesc: '唱歌好听，画画也是一级棒',
                mvscore: 0,
                mvtitle: 'Rescue',
                picurl: 'http://puui.qpic.cn/qqvideo/0/f0024ms801u/0',
                pub_date: '2017-06-29',
                singer_id: 28107,
                singer_mid: '004eNJMO2vAfby',
                singer_name: 'Hunter Hayes',
                vid: 'f0024ms801u'
              }
            ]
          },
          toplist: [
            {
              ListName: '巅峰榜·福特新蒙迪欧·流行指数',
              MacDetailPicUrl: 'http://y.gtimg.cn/music/common/upload/t_order_channel_hitlist_conf/64072.png',
              MacListPicUrl: 'http://y.gtimg.cn/music/common/upload/t_order_channel_hitlist_conf/64073.png',
              headPic_v12: 'http://y.gtimg.cn/music/common/upload/t_order_channel_hitlist_conf/98741.jpg',
              listennum: 19500000,
              pic: 'http://y.gtimg.cn/music/common/upload/t_order_channel_hitlist_conf/64070.png',
              pic_Detail: 'http://y.gtimg.cn/music/common/upload/t_order_channel_hitlist_conf/98739.jpg',
              pic_h5: 'http://y.gtimg.cn/music/common/upload/t_order_channel_hitlist_conf/64065.png',
              pic_v11: 'http://y.gtimg.cn/music/common/upload/t_order_channel_hitlist_conf/64071.png',
              pic_v12: 'http://y.gtimg.cn/music/common/upload/iphone_order_channel/toplist_4_300_202814739.jpg',
              showtime: '2017-07-01',
              songlist: [
                {
                  singerid: 60505,
                  singername: '李荣浩',
                  songid: 202814739,
                  songname: '就这样'
                },
                {
                  singerid: 1012038,
                  singername: '张磊',
                  songid: 202891299,
                  songname: '因为一个人'
                },
                {
                  singerid: 34412,
                  singername: 'TFBOYS',
                  songid: 202979233,
                  songname: '同一秒快乐'
                },
                {
                  singerid: 5062,
                  singername: '薛之谦',
                  songid: 202984408,
                  songname: '小孩 (Live)'
                }
              ],
              topID: 4,
              type: 0,
              update_key: '2017-07-01'
            },
            {
              ListName: '巅峰榜·热歌',
              MacDetailPicUrl: 'http://y.gtimg.cn/music/common/upload/iphone_order_channel/20150820172909.jpg',
              MacListPicUrl: 'http://y.gtimg.cn/music/common/upload/iphone_order_channel/20150820172903.jpg',
              headPic_v12: 'http://y.gtimg.cn/music/common/upload/iphone_order_channel/20150820174954.jpg',
              listennum: 19200000,
              pic: 'http://y.gtimg.cn/music/common/upload/iphone_order_channel/20150820172838.jpg',
              pic_Detail: 'http://y.gtimg.cn/music/common/upload/iphone_order_channel/20150820172850.jpg',
              pic_h5: 'http://y.gtimg.cn/music/common/upload/iphone_order_channel/20150820172810.jpg',
              pic_v11: 'http://y.gtimg.cn/music/common/upload/iphone_order_channel/20150820172844.jpg',
              pic_v12: 'http://y.gtimg.cn/music/common/upload/iphone_order_channel/toplist_26_300_202773258.jpg',
              showtime: '2017-06-29',
              songlist: [
                {
                  singerid: 33680,
                  singername: '岑宁儿',
                  songid: 202773258,
                  songname: '追光者'
                },
                {
                  singerid: 3954,
                  singername: '汪苏泷',
                  songid: 202656275,
                  songname: '那个男孩'
                },
                {
                  singerid: 1190986,
                  singername: 'BLACKPINK',
                  songid: 202831830,
                  songname: 'As If It’s Your Last (마지막처럼)'
                },
                {
                  singerid: 12111,
                  singername: '金志文',
                  songid: 202803579,
                  songname: '我想念'
                }
              ],
              topID: 26,
              type: 0,
              update_key: '2017_26'
            },
            {
              ListName: '巅峰榜·新歌',
              MacDetailPicUrl: 'http://y.gtimg.cn/music/common/upload/iphone_order_channel/20150820172435.jpg',
              MacListPicUrl: 'http://y.gtimg.cn/music/common/upload/iphone_order_channel/20150820172427.jpg',
              headPic_v12: 'http://y.gtimg.cn/music/common/upload/iphone_order_channel/20150820174934.jpg',
              listennum: 11598910,
              pic: 'http://y.gtimg.cn/music/common/upload/iphone_order_channel/20150820172358.jpg',
              pic_Detail: 'http://y.gtimg.cn/music/common/upload/iphone_order_channel/20150820172414.jpg',
              pic_h5: 'http://y.gtimg.cn/music/common/upload/iphone_order_channel/20150820172242.jpg',
              pic_v11: 'http://y.gtimg.cn/music/common/upload/iphone_order_channel/20150820172404.jpg',
              pic_v12: 'http://y.gtimg.cn/music/common/upload/iphone_order_channel/toplist_27_300_202814739.jpg',
              showtime: '2017-07-01',
              songlist: [
                {
                  singerid: 60505,
                  singername: '李荣浩',
                  songid: 202814739,
                  songname: '就这样'
                },
                {
                  singerid: 1012038,
                  singername: '张磊',
                  songid: 202891299,
                  songname: '因为一个人'
                },
                {
                  singerid: 34412,
                  singername: 'TFBOYS',
                  songid: 202979233,
                  songname: '同一秒快乐'
                },
                {
                  singerid: 27090,
                  singername: '에이핑크 (Apink)',
                  songid: 202902997,
                  songname: 'FIVE'
                }
              ],
              topID: 27,
              type: 0,
              update_key: '2017-07-01'
            },
            {
              ListName: '巅峰榜·欧美',
              MacDetailPicUrl: 'http://y.gtimg.cn/music/common/upload/iphone_order_channel/20140519104205.jpg',
              MacListPicUrl: 'http://y.gtimg.cn/music/common/upload/iphone_order_channel/20140519104155.jpg',
              headPic_v12: 'http://y.gtimg.cn/music/common/upload/iphone_order_channel/20160224140905.jpg',
              listennum: 14789560,
              pic: 'http://y.gtimg.cn/music/common/upload/iphone_order_channel/20140519104119.jpg',
              pic_Detail: 'http://y.gtimg.cn/music/common/upload/iphone_order_channel/20140519104128.jpg',
              pic_h5: 'http://y.gtimg.cn/music/common/upload/iphone_order_channel/20140519104015.jpg',
              pic_v11: 'http://y.gtimg.cn/music/common/upload/iphone_order_channel/20140707170348.jpg',
              pic_v12: 'http://y.gtimg.cn/music/common/upload/iphone_order_channel/toplist_3_300_202817060.jpg',
              showtime: '2017-06-29',
              songlist: [
                {
                  singerid: 22045,
                  singername: 'Hardwell/蔡依林',
                  songid: 202817060,
                  songname: 'We Are One'
                },
                {
                  singerid: 1129972,
                  singername: 'Area21',
                  songid: 202856278,
                  songname: 'We Did It'
                },
                {
                  singerid: 8958,
                  singername: 'Pharrell Williams',
                  songid: 202711827,
                  songname: 'Yellow Light'
                },
                {
                  singerid: 290,
                  singername: 'Coldplay',
                  songid: 202808277,
                  songname: 'All I Can Think About Is You'
                }
              ],
              topID: 3,
              type: 0,
              update_key: '2017_26'
            }
          ]
        }
      }
    }
  },
  mounted() {
    // 获取页面数据
    this.getRecommend()

    this.getRecoList();
    // 设置loading图,至少显示1500毫秒,当获取数据成功后取消loading图
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
