import 'babel-polyfill'
import Vue from 'vue'
import Router from 'vue-router'
import Playlist from 'components/playlist/playlist'
import Ranking from 'components/ranking/ranking'
import Recommend from 'components/recommend/recommend'
import PlayListdetail from 'components/common/playListdetail'
import Mine from 'components/mine/mine'
import Swiper from 'vue-awesome-swiper'


Vue.use(Router)
Vue.use(Swiper)

export default new Router({
  routes: [
    {
      path: '/playlist',
      name: 'playlist',
      component: Playlist,
      children: [
        {
          path: ':id',
          component: PlayListdetail
        }
      ]
    },
    {
      path: '/ranking',
      name: 'ranking',
      component: Ranking
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: Recommend
    },
    {
      path: '/mine',
      name: 'mine',
      component: Mine
    }
  ]
})
