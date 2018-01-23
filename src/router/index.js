import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Index from '@/components/index'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/main',
      name: 'Main',
      component: Main
    },
    {
    	path:'/index',
    	component: Index,
    	children:[
    		{
    			path:'/',
    			alias:'/order_list',
    			component: (resolve) => require(['@/components/order/list'], resolve)
    		},
    		{
    			path:'/chem_list',
    			component: (resolve) => require(['@/components/product/ChemList'], resolve)
    		}
    	]
    },
    {
    	path:'/',
    	alias: '/login',
    	component: Login
    }
  ]
})
