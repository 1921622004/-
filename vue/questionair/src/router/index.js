import Vue from 'vue'
import Router from 'vue-router'
import Mine from '../components/Mine.vue'
import Empty from '../components/base/Empty.vue'
import List from '../components/base/List.vue'
import Create from '../components/base/Create.vue'
import Count from '../components/base/Count.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/mine'
    },
    {
      path:'/list',
      component:List
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