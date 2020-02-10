import Vue from 'vue'
import Calendar from '@pigsking/vue-mark-calendar'
import App from './App.vue'


Vue.use(Calendar)
Vue.config.productionTip = false



new Vue({
  render: h => h(App)
}).$mount('#app')
