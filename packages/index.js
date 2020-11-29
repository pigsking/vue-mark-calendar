import Calendar from './calendar';

Calendar.install = (Vue) => {
    Vue.component(Calendar.name, Calendar)
}

export default Calendar;