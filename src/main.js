// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import ElementUI from 'element-ui'
import router from './router'
import locale from 'element-ui/lib/locale/lang/en'
import store from './store'
import axios from './axios'
import AMap from 'vue-amap'
import VueJsonp from 'vue-jsonp'
import VueClipboard from 'vue-clipboard2'
import md5 from 'js-md5';
import VueDND from 'awe-dnd'
import i18n from './i18n/i18n';


Vue.use(VueDND)
Vue.use(VueClipboard)
Vue.use(AMap)
Vue.use(VueJsonp);
Vue.prototype.$md5 = md5;

// 初始化vue-amap
AMap.initAMapApiLoader({
  // 高德的key
  key: '8e690cea3c730cd58af117146fcf3b61',
  // 插件集合 （插件按需引入）
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  v: '1.4.4'
})

Vue.use(ElementUI, { locale })
Vue.config.productionTip = false

// 路由拦截器
router.beforeEach((to, from, next) => {
  let userList = ['propertyTypes', 'tripsList', 'messages', 'walletHome','lstDetail','hosts']

  if(store.state.userInfo == null){
    if (userList.indexOf(to.name) !== -1) {
      router.push('/')
      store.state.show_login = true
    } else {
      next()
    }
  }else{
    next()
  }


})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  axios,
  i18n,
  components: { App },
  template: '<App/>'
})
