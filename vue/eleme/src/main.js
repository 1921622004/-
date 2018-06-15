// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {Cell,CellGroup, } from 'vant'
import { Popup, Icon,Stepper,Panel,CouponCell,CouponList} from 'vant'
import 'vant/lib/vant-css/icon.css';
import 'vant/lib/vant-css/Popup.css';
import 'vant/lib/vant-css/stepper.css'
import 'vant/lib/vant-css/Panel.css'
import 'vant/lib/vant-css/cell.css'
import 'vant/lib/vant-css/coupon-list.css'


Vue.use(CouponCell).use(CouponList);

Vue.use(Icon).use(Popup).use(Stepper).use(Panel).use(Cell).use(CellGroup);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
