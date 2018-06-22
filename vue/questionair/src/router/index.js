import Vue from 'vue'
import Router from 'vue-router'
import Mine from '../components/Mine.vue'
import Empty from '../components/base/Empty.vue'
import List from '../components/base/List.vue'
import Create from '../components/base/Create.vue'
import Count from '../components/base/Count.vue'
import Login from '../components/Login.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/login'
    },
    {
      path:'/list',
      component:List
    },
    {
      path:'/login',
      component:Login
    },
    {
      path:'/mine',
      component:Mine,
      name:'mine',
      children:[
        {
          path:'empty',
          component:Empty
        },
        {
          path:'list',
          component:List
        },
        {
          path:'create',
          component:Create
        },
        {
          path:'count/:id',
          component:Count,
          name:'count',
          props:true
        }
      ]
    }
  ]
})
