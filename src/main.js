import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueLazyload from 'vue-lazyload'
import store from './store'
// 注册 axios
Vue.prototype.$http = axios
Vue.config.productionTip = false
// 设置默认加载图片
Vue.use(VueLazyload, {
  loading: require('./assets/images/loading_big.png'),
  listenEvents: ['scroll']
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
