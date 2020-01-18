import Vue from 'vue'
import VueRouter from 'vue-router'
import Calendar from '@pigsking/vue-mark-calendar'
import App from './App.vue'
import Cooking from './Cooking.vue'
import Eat from './Eat.vue'


Vue.use(Calendar)
Vue.use(VueRouter)
Vue.config.productionTip = false


const router = new VueRouter({
  mode: 'history',
  base:'vue-mark-calendar',
  routes: [
    { path: '/', component: Cooking },
    { path: '/eat', component: Eat }
  ]
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
