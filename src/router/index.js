import Vue from 'vue'
import Router from 'vue-router'
import IndexPage from '@/pages/IndexPage'
import VipPage from '@/pages/VipPage'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'IndexPage',
      component: IndexPage
    },
    {
      path: '/vip',
      name: 'VipPage',
      component: VipPage
    }
  ]
})
