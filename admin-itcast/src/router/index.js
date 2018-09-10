import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import User from '../views/User/User.vue'
import right from '../views/right/right.vue'
import rloe from '../views/right/rloe.vue'
import Categories from '../views/goods/Categories.vue'

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
      path: '/users',
      name: 'User',
      component: User
    },
    {
      path: 'rights',
      name: 'right',
      component: right
    },
    {
      path: 'roles',
      name: 'rloe',
      component: rloe
    },
    {
      path: 'categories',
      name: 'Categories',
      component: Categories
    }
    ]

  }

  ]
})
