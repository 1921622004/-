import Vue from 'vue'
import Router from 'vue-router'
import order from '../components/order.vue'
import review from '../components/review.vue'
import shop from '../components/shop.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/order',
      component:order
    },
    {
      path:'/review',
      component:review
    },
    {
      path:'/shop',
      component:shop
    }
  ],
  linkActiveClass:'active-link'
})
