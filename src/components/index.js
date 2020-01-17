import Calendar from './calendar'

const install = function (Vue) {
    if (install.installed) { return }

    Vue.component(Calendar.name, Calendar)
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default {
    install,
    Calendar
}
