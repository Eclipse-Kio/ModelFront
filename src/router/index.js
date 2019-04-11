import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/SystemLog'
    }, {
      path: '/SystemLog',
      name: 'SystemLog',
      component: resolve => require(['@/pages/SystemLog'], resolve)
    }, {
      path: '/SystemParameter',
      name: 'SystemParameter',
      component: resolve => require(['@/pages/Model1'], resolve)
    }, {
      path: '/Model1',
      name: 'Model1',
      component: resolve => require(['@/pages/Model1'], resolve)
    }, {
      path: '/Model3',
      name: 'Model3',
      component: resolve => require(['@/pages/Model3'], resolve)
    }
  ]
})
