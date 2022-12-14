// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from 'vant';
import 'vant/lib/index.css';
import filters from './utils/filters'
import util from './utils/util';

import '@/permission' // permission control
Vue.use(Vant);

// 遍历注册全局过滤器
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
