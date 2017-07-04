import 'babel-polyfill'
import Vue from 'vue'
import Router from 'vue-router'
import Radio from 'components/radio/radio'
import Ranking from 'components/ranking/ranking'
import Recommend from 'components/recommend/recommend'
import Mine from 'components/mine/mine'
import Swiper from 'vue-awesome-swiper'

Vue.use(Router)
Vue.use(Swiper)

export default new Router({
  routes: [
    {
      path: '/radio',
      name: 'radio',
      component: Radio
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
