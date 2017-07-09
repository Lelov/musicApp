import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueLazyload from 'vue-lazyload'

// 注册 axios
Vue.prototype.$http = axios
Vue.config.productionTip = false
// 设置默认加载图片
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'assets/images/loading_big.png',
  loading: 'assets/images/loading_big.png',
  attempt: 1
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
