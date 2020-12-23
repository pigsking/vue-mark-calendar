import Calendar from './calendar/index.jsx';

const install = (Vue) => {
    Vue.component(Calendar.name, Calendar);
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    install
}
