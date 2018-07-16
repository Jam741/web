import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);

export default new Router({
  //mode:'history',
  routes: [

    {path: '/', redirect: {name: 'index'}},
    /*首页*/
    {path: '/index', name: 'index', component: (resolve => require(['../pages/index/index'], resolve))},


    //{
    //	path: '/twitterInfo',
    //	name: 'twitterInfo',
    //	component: twitterInfo,
    //
    //	meta: {
    //		keepAlive: true //需要被缓存
    //	}
    //},

  ]
})
