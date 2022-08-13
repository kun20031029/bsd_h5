import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '@/page/login'
import index from '@/page/index'
import task from '@/page/task'
import details from '@/page/details'
import setClass from '@/page/setclass'
import guiding from '@/page/guiding'
import surepage from '@/page/surepage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/task',
      name: 'task',
      component: task
    },
    {
      path: '/details',
      name: 'details',
      component: details
    },
    {
      path: '/setClass',
      name: 'setClass',
      component: setClass
    },
    {
      path: '/guiding',
      name: 'guiding',
      component: guiding
    },
    {
      path: '/surepage',
      name: 'surepage',
      component: surepage
    },
  ]
})
