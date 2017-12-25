import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development env not use Lazy Loading,because Lazy Loading too many pages will cause webpack hot update too slow.so only in production use Lazy Loading

/* layout */
import Layout from '../views/layout/Layout'

Vue.use(Router)

 /**
  * icon : the icon show in the sidebar
  * hidden : if `hidden:true` will not show in the sidebar
  * redirect : if `redirect:noredirect` will not redirct in the levelbar
  * noDropdown : if `noDropdown:true` will not has submenu in the sidebar
  * meta : `{ role: ['admin'] }`  will control the page role
  **/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/404', component: _import('404'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{ path: 'dashboard', component: _import('dashboard/index') }]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/example',
    component: Layout,
    redirect: 'noredirect',
    name: 'Example',
    icon: 'zujian',
    children: [
      { path: 'index', name: 'Form', icon: 'zonghe', component: _import('page/form') }
    ]
  },
  {
    path: '/checkout',
    component: Layout,
    redirect: '/checkout/index',
    icon: 'money',
    noDropdown: true,
    children: [{ path: 'index', name: '收银', component: _import('checkout/index'), meta: { role: ['admin'] }}]
  },
  {
    path: '/users',
    component: Layout,
    redirect: '/users/index',
    icon: 'peoples',
    noDropdown: true,
    children: [{ path: 'index', name: '用户管理', component: _import('users/index'), meta: { role: ['admin'] }}]
  },
  {
    path: '/users',
    component: Layout,
    redirect: '/users/detail',
    hidden: false,
    noDropdown: true,
    children: [{ path: 'detail', name: '用户详情', component: _import('users/userdetail'), meta: { role: ['admin'] }}]
  },
  {
    path: '/products',
    component: Layout,
    redirect: '/products/index',
    icon: 'shoppingCard',
    noDropdown: true,
    children: [{ path: 'index', name: '商品管理', component: _import('products/index'), meta: { role: ['admin'] }}]
  },
  {
    path: '/appointments',
    component: Layout,
    redirect: '/appointments/groom',
    name: '预约管理',
    icon: 'shoppingCard',
    children: [
      { path: 'groom', name: '美容预约', component: _import('appointments/groom'), meta: { role: ['admin'] }},
      { path: 'hotel', name: '寄养预约', component: _import('appointments/hotel'), meta: { role: ['admin'] }}
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]
