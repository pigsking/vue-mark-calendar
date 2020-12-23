import { createApp } from "vue";
import App from "./App.vue";
// import Calendar from "../packages";
import Calendar from '../dist/vue-mark-calendar.es.js'
// import Calendar from '@pigsking/vue-mark-calendar'

const app = createApp(App)
app.use(Calendar)
app.mount('#app')
