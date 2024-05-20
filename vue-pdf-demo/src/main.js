// import "babel-polyfill"
// import 'core-js/stable';
// import 'regenerator-runtime/runtime';
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import './styles/reset.scss';
import './styles/init.scss'
import './styles/_variables.scss';
import 'element-ui/lib/theme-chalk/index.css';
import '../element-variables.scss'

import "./assets/fonts/iconfont.css"
// 引入swiper样式
import "swiper/dist/css/swiper.css";


import fetch from './api/axios'


Vue.use(ElementUI)
Vue.prototype.$http = fetch
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')