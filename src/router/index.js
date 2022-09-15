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
import classResult from '@/page/classResult'
import notice from '@/page/notice'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base:'/sxdd',
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
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
    {
      path: '/classResult',
      name: 'classResult',
      component: classResult
    },
    {
      path: '/notice',
      name: 'notice',
      component: notice
    },
  ]
})
