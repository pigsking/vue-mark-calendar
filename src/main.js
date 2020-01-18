import Vue from 'vue'
import App from './App.vue'
import Calendar from '@pigsking/vue-mark-calendar'
// import * as Calendar from '../lib/vue-mark-calendar.umd.js'

Vue.use(Calendar)
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
