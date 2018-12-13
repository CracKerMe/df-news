import Vue from 'vue'
import Router from 'vue-router'
import Home from 'views/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/video',
      name: 'Video',
      component: () => import('views/Video')
    },
    {
      path: '/detail/:id',
      component: () => import('views/Detail')
    },
    {
      path: '/player',
      component: () => import('views/Player')
    }
  ]
})
