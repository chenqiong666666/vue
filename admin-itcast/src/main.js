// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import Vuex from 'vuex'
import App from './App'
import router from './router'
import './styles/index.scss'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// Vue.use(Vuex)
import store from '@/store/store.js'
// console.log(store)
Vue.use(ElementUI)
Vue.config.productionTip = false
// 添加全局守卫--导航守卫
router.beforeEach((to, from, next) => {
  var token = localStorage.getItem('mytoken')
  if (token) {
    next()
  } else {
    // 判断是否为login页面
    if (to.path === '/login') {
      next()
    } else {
      // 不是login 且没有token
      next({
        name: 'Login'
      })
    }
  }
})

// var store = new Vuex.Store({
//   state: {
//     username: ''
//   }
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
