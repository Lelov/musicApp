# 1.router-link
`router-link` 标签默认解析为a标签,可以通过指定其`tag`属性改变其解析后的实际标签名称,进而一步也可以指定`class`的属性值
```
<router-link tag="div" class="nav-link" to="/home">home</router-link>
```
解析:
```
<div class="nav-link">home</div>
```
# 2. vue 解决跨域问题
使用第三方库 `jsonp` 来解决跨域问题
安装:
```
npm install jsonp --save
```
简单demo
```
// 引入jsonp模块
var jsonp = require('jsonp');

// 发送请求
jsonp('http://www.example.com/foo', null, function (err, data) {
  if (err) {
    console.error(err.message);
  } else {
    console.log(data);
  }
});

```
# 3. keep-alive
`keep-alive` 用于缓存 `router-view` 中请求的数据,而无需每次切换都去请求数据

# 4. vue轮播图 vue-awesome-swiper
首先安装 `vue-awesome-swiper`
```
npm install vue-awesome-swiper --save
```
在全局注册
```
import Swiper from 'vue-awesome-swiper';
Vue.use(Swiper);
```
这个 `vue-awesome-swiper` 是基于 `swiper` 编写的,参数设置都一样,参考 `SPA` 的 `demo`
```
<!-- The ref attr used to find the swiper instance -->
<template>
  <swiper :options="swiperOption" ref="mySwiper">
    <!-- slides -->
    <swiper-slide>I'm Slide 1</swiper-slide>
    <swiper-slide>I'm Slide 2</swiper-slide>
    <swiper-slide>I'm Slide 3</swiper-slide>
    <swiper-slide>I'm Slide 4</swiper-slide>
    <swiper-slide>I'm Slide 5</swiper-slide>
    <swiper-slide>I'm Slide 6</swiper-slide>
    <swiper-slide>I'm Slide 7</swiper-slide>
    <!-- Optional controls -->
    <div class="swiper-pagination"  slot="pagination"></div>
    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
    <div class="swiper-scrollbar"   slot="scrollbar"></div>
  </swiper>
</template>

<script>
  // swiper options example:
  export default {
    name: 'carrousel',
    data() {
      return {
        swiperOption: {
          // NotNextTick is a component's own property, and if notNextTick is set to true, the component will not instantiate the swiper through NextTick, which means you can get the swiper object the first time (if you need to use the get swiper object to do what Things, then this property must be true)
          // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
          notNextTick: true,
          // swiper configs 所有的配置同swiper官方api配置
          autoplay: 3000,
          direction : 'vertical',
          grabCursor : true,
          setWrapperSize :true,
          autoHeight: true,
          pagination : '.swiper-pagination',
          paginationClickable :true,
          prevButton:'.swiper-button-prev',
          nextButton:'.swiper-button-next',
          scrollbar:'.swiper-scrollbar',
          mousewheelControl : true,
          observeParents:true,
          // if you need use plugins in the swiper, you can config in here like this
          // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
          debugger: true,
          // swiper callbacks
          // swiper的各种回调函数也可以出现在这个对象中，和swiper官方一样
          onTransitionStart(swiper){
            console.log(swiper)
          },
          // more Swiper configs and callbacks...
          // ...
        }
      }
    },
    // you can find current swiper instance object like this, while the notNextTick property value must be true
    // 如果你需要得到当前的swiper对象来做一些事情，你可以像下面这样定义一个方法属性来获取当前的swiper对象，同时notNextTick必须为true
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    mounted() {
      // you can use current swiper instance object to do something(swiper methods)
      // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
      console.log('this is current swiper instance object', this.swiper)
      this.swiper.slideTo(3, 1000, false)
    }
  }
</script>
```
# 5.在切换页面时如果当前页面有定时器之类的最好先清掉
# 6.vue-lazyload vue图片懒加载插件
# 7.在vue使用 `axios` 完成网络请求相关配置
- axios配置在 src 根目录的 main.js 中,

```
import axios from 'axios'
```
将axios添加到Vue实例上
```
Vue.prototype.$http = axios;
```
