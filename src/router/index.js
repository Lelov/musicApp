import 'babel-polyfill'
import Vue from 'vue'
import Router from 'vue-router'
import Swiper from 'vue-awesome-swiper'
import Recommend from 'components/recommend/recommend'
Vue.use(Router)
Vue.use(Swiper)

export default new Router({
  routes: [
    {
      path: '/playlist',
      name: 'playlist',
      component: resolve => require(['components/playlist/playlist.vue'], resolve),
      children: [
        {
          path: ':id',
          component: resolve => require(['components/common/playListdetail.vue'], resolve),
        }
      ]
    },
    {
      path: '/search',
      name: 'search',
      component: resolve => require(['components/search/search.vue'], resolve)
    },
    {
      path: '/recommend',
      name: 'recommend',
      // component: Recommend
      component: resolve => require(['components/recommend/recommend.vue'], resolve)
    },
    {
      path: '/mine',
      name: 'mine',
      component: resolve => require(['components/mine/mine.vue'], resolve)
    }
  ]
})
