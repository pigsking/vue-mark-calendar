import Vue from 'vue'
import App from './App.vue'
import Calendar from './components'

Vue.use(Calendar)
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
