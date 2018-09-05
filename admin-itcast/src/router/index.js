import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import User from '../views/User/User.vue'
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/login',
    name: 'Login',
    component: Login
  },

  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [{
      path: '/user',
      name: 'User',
      component: User
    }]
  }

  ]
})
