import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import store from './store/index';

Vue.prototype.$http = axios

Vue.use(ElementUI)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  const requireAuth = to.meta.requireAuth
  // 判断该路由是否需要登录权限
  if (requireAuth) {
    if (window.sessionStorage.getItem('login')) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()  // 确保一定要有next()被调用
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
