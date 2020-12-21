import "./index.css"

export default {
    name: "Calendar",
    props: {
        markers: {
            type: Array,
            default: () => []
        },
        disabledFutureDay: {
            type: Boolean,
            default: false
        },
        hideOtherMonthDay: {
            type: Boolean,
            default: false
        },
        hideOtherMonthMarker: {
            type: Boolean,
            default: false
        },
        hideMarker: {
            type: Boolean,
            default: false
        },
        format: {
            default: "YYYY/MM/DD",
            validator: (value) => {
                return ["YYYY/MM/DD", "YYYY/M/D", "YYYY-MM-DD", "YYYY-M-D"].includes(value)
            }
        },
        sundayBegin: {
            type: Boolean,
            default: false
        },
        weekText: {
            type: Array,
            default: () => ["一", "二", "三", "四", "五", "六", "日"],
            validator: (value) => {
                return value.length === 7
            }
        },
        todayText: String,
        disabledSwitchMonth: {
            type: Boolean,
            default: false
        },
        multiDayMarkers: {
            type: Array,
            default: () => []
        },
        hideArrows: {
            type: Boolean,
            default: false
        },
        darkMode: {
            type: Boolean,
            default: true
        },
        lang: {
            type: String,
            default: 'zh-CN',
            validator: (value) => {
                return ["zh-CN", "en-US"].includes(value)
            }
        }
    },
    data() {
        return {
            days: [],
            currentDate: "",
            chosenDate: '',
            isSwitchYear: false,
            isSwitchMonth: false,
            minPickerYear: 0,
        };
    },
    computed: {
        weekTxt() {
            if (this.sundayBegin) {
                this.weekText.unshift(this.weekText.pop());
            }
            return this.weekText;
        },
        showNextMonthSwitch() {
            if (this.disabledFutureDay) {
                const { year, month } = this.getDateObj();
                const { year: currentYear, month: currentMonth } = this.getDateObj(this.currentDate);

                if (year === currentYear && currentMonth === month) return false;
            }
            return true;
        },
        monthText() {
            return {
                'zh-CN': ['1 月', '2 月', '3 月', '4 月', '5 月', '6 月', '7 月', '8 月', '9 月', '10 月', '11 月', '12 月'],
                'en-US': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Now', 'Dec']
            }[this.lang]
        }
    },
    watch: {
        currentDate(date) {
            this.initCalendar(date);
            this.$emit("date", this.getDayObj());
        },
        markers() {
            this.initCalendar(this.currentDate)
        },
        hideMarker() {
            this.initCalendar(this.currentDate)
        },
        hideOtherMonthMarker() {
            this.initCalendar(this.currentDate)
        },
        multiDayMarkers() {
            this.initCalendar(this.currentDate)
        }
    },
    mounted() {
        this.initCalendar();
    },
    methods: {
        /**
         * @description init month
         */
        initCalendar(dateStr) {
            const { year, month, date } = this.getDateObj(dateStr);

            const prevMonth = month === 1 ? 12 : month - 1;
            const nextMonth = month === 12 ? 1 : month + 1;

            const currentMonthDays = this.getDays(year, month);
            const prevMonthDays = this.getDays(year, prevMonth, "prev");
            const nextMonthDays = this.getDays(year, nextMonth, "next");

            let firstDay = currentMonthDays[0].week;

            if (this.sundayBegin) firstDay += 1;

            const prevMonthFewDays = prevMonthDays.slice(
                prevMonthDays.length - firstDay,
                prevMonthDays.length - 1
            );
            const days = [
                ...prevMonthFewDays,
                ...currentMonthDays,
                ...nextMonthDays
            ];

            this.days = days.slice(0, 42)
            this.currentDate = date
            this.minPickerYear = year

            if (!this.chosenDate) this.chosenDate = date
        },
        /**
         * @description get the total days in the month
         * @param {Number} year
         * @param {Number} month
         * @param {String} type
         * @return {Array} days
         */
        getDays(year, month, type) {
            let days = [];

            const markers = this.markers;
            const multiDayMarkers = this.multiDayMarkers
            const hideOtherMonthMarker = this.hideOtherMonthMarker;
            const hideMarker = this.hideMarker
            const totalDays = this.getTotalDays(year, month);
            const { timestamp: todayTimestamp } = this.getDateObj()

            if (type === "prev" && month === 12) year -= 1;
            if (type === "next" && month === 1) year += 1;

            for (let i = 0; i < totalDays; i++) {
                const day = i + 1;
                const dateStr = `${year}/${month}/${day}`;
                const { date, week, timestamp } = this.getDateObj(dateStr);

                const dayObj = {
                    day: day,
                    date: date,
                    week: week,
                    timestamp: timestamp,
                    className: '',
                    isOtherMonthDay: ["prev", "next"].includes(type),
                    isFutureDay: timestamp > todayTimestamp,
                    isToday: todayTimestamp === timestamp
                };

                // add marker
                if (!hideMarker) {
                    if (!(hideOtherMonthMarker && dayObj.isOtherMonthDay)) {
                        markers.forEach(item => {
                            if (this.getDateObj(item.date).date === dayObj.date)
                                dayObj.className = item.className;
                        });
                        multiDayMarkers.forEach(item => {
                            const { timestamp: startTimestamp, date: startDate } = this.getDateObj(item.startDate)
                            const { timestamp: endTimestamp, date: endDate } = this.getDateObj(item.endDate)

                            dayObj['startDate'] = startDate
                            dayObj['endDate'] = endDate

                            if (startTimestamp === dayObj.timestamp) {
                                dayObj.className = `${item.className} start-marker`;
                            }

                            if (startTimestamp < dayObj.timestamp && dayObj.timestamp < endTimestamp) {
                                dayObj.className = item.className
                            }

                            if (endTimestamp === dayObj.timestamp) {
                                dayObj.className = `${item.className} end-marker`;
                            }
                        })

                    }
                }

                days.push(dayObj);
            }
            return days;
        },
        setIsSwitchYearState() {
            this.isSwitchYear = !this.isSwitchYear
            if (this.isSwitchYear) this.isSwitchMonth = false
        },
        setIsSwitchMonthState() {
            this.isSwitchMonth = !this.isSwitchMonth
            if (this.isSwitchMonth) this.isSwitchYear = false
        },
        /**
         * @description switch month
         * @param {String} type prev or next
         */
        handleSwitch(type) {
            this.isSwitchYear ? this.switchYear(type) : this.switchMonth(type)
        },
        switchYear(type) {
            if (type === 'prev') {
                this.minPickerYear -= 12
            } else {
                this.minPickerYear += 12
            }
        },
        switchMonth(type) {
            let { year, month, day } = this.getDateObj(this.currentDate);

            // prev month
            if (type === "prev") {
                if (month > 1) {
                    month--;
                } else {
                    year--;
                    month = 12;
                }
            }
            // next month
            if (type === "next") {
                if (month < 12) {
                    month++;
                } else {
                    year++;
                    month = 1;
                }
            }

            const switchAfterMonthTotalDays = this.getTotalDays(year, month);
            // avoid month cross-border
            if (this.disabledFutureDay) {
                const { day: nowDay } = this.getDateObj()
                if (day > nowDay) {
                    day = nowDay
                }
            } else {
                if (day > switchAfterMonthTotalDays) {
                    day = switchAfterMonthTotalDays;
                }
            }

            this.currentDate = this.getDateObj(`${year}/${month}/${day}`).date;
        },
        /**
         * @description choose one day
         * @param {Object} item
         */
        handleChooseDay(item) {
            if ((this.disabledFutureDay && item.isFutureDay)) return
            if (this.disabledSwitchMonth && item.isOtherMonthDay) return

            if (item.isOtherMonthDay) {
                item.day > 7
                    ? this.switchMonth("prev")
                    : this.switchMonth("next");
            }
            this.chosenDate = this.currentDate = item.date;
        },
        handleChooseYear(year) {
            const { month, day } = this.getDateObj(this.currentDate)
            this.currentDate = this.getDateObj(`${year}/${month}/${day}`).date;
            this.isSwitchYear = false
        },
        handleChooseMonth(month) {
            const { year, day } = this.getDateObj(this.currentDate)
            this.currentDate = this.getDateObj(`${year}/${month}/${day}`).date;
            this.isSwitchMonth = false
        },
        /**
         * @description match month's day obj by the date string
         * @param {String} date
         * @return {Object}
         */
        getDayObj() {
            return this.days.find(item => item.date === this.currentDate);
        },

        /**
         * @description choose target date
         * @param {String} date
         */
        chooseDate(date) {
            this.chosenDate = this.currentDate = this.getDateObj(date).date;
            if (!date) this.chosenDate = this.currentDate;
        },
        /**
         * @description get total days
         * @param {Number} year 
         * @param {Number} month 
         * @return {Number}
         */
        getTotalDays(year, month) {
            const isLeapYear = (year % 4 == 0 && year % 100 != 0) || year % 400 == 0
            return month == 2 ?
                (isLeapYear ? 29 : 28) :
                ([4, 6, 9, 11].includes(month) ? 30 : 31)
        },
        /**
          * @description get date obj
          * @param {Number} year 
          * @param {String} format
          * @return {Object}
          */
        getDateObj(date, format = this.format) {
            const dateObj = date ? new Date(date.replace(/-/g, "/")) : new Date(new Date().setHours(0, 0, 0, 0))
            const year = dateObj.getFullYear(), month = dateObj.getMonth() + 1, day = dateObj.getDate();
            return {
                year: year,
                month: month,
                day: day,
                week: dateObj.getDay() || 7,
                timestamp: dateObj.getTime() / 1000,
                date: format.toUpperCase().replace(/\[.*?\]|Y{2,4}|M{1,2}|D{1,2}|SSS/g, (match) => {
                    return {
                        // YY: String(year).slice(-2),
                        YYYY: year,
                        M: month,
                        MM: month > 9 ? month : `0${month}`,
                        D: day,
                        DD: day > 9 ? day : `0${day}`
                    }[match]
                })
            }
        },
        prevMonth() {
            this.switchMonth('prev')
        },
        nextMonth() {
            this.switchMonth('next')
        },

    },
    render() {
        let dateContent = ''
        let weekContent = []
        let monthContent = []
        let yearPickerContent = []
        let monthPickerContent = []

        const { year, month } = this.getDateObj(this.currentDate)

        if (this.lang === 'zh-CN') {
            dateContent = <span class="date">
                <i class={{ 'active': this.isSwitchYear }} onClick={() => this.setIsSwitchYearState()}>{year}年</i> <i class={{ 'active': this.isSwitchMonth }} onClick={() => this.setIsSwitchMonthState()}>{month}月</i>
            </span>
        } else {
            dateContent = <span class="date">
                <i class={{ 'active': this.isSwitchMonth }} onClick={() => this.setIsSwitchMonthState()}>{this.monthText[month - 1]}</i> <i class={{ 'active': this.isSwitchYear }} onClick={() => this.setIsSwitchYearState()}>{year}</i>
            </span>
        }

        const headerContent = (
            <div class='month-switch'>
                {!this.isSwitchMonth && <span class={{ 'prev': !this.hideArrows && !this.disabledSwitchMonth }} onClick={() => this.handleSwitch('prev')}></span>
                }
                {dateContent}
                {!this.isSwitchMonth && this.showNextMonthSwitch &&
                    <span class={{ 'next': !this.hideArrows && !this.disabledSwitchMonth }} onClick={() => this.handleSwitch('next')}></span>}
            </div>
        );

        this.weekTxt.forEach(item => {
            weekContent.push(
                <li>{item}</li>
            )
        })
        this.days.forEach((dayObj, index) => {
            let day = ''
            const classes = {
                ['future-day']: this.disabledFutureDay && dayObj.isFutureDay,
                ['weekend-day']:
                    !(this.disabledFutureDay && dayObj.isFutureDay) &&
                    [6, 7].includes(dayObj.week),
                ['chosen-day']: this.chosenDate === dayObj.date,
                ['other-month-day']: dayObj.isOtherMonthDay,
                today: dayObj.isToday
            };

            if (!(dayObj.isOtherMonthDay && this.hideOtherMonthDay)) {
                day = (
                    <span onClick={() => this.handleChooseDay(dayObj, index)}>
                        {this.todayText && dayObj.isToday ? this.todayText : dayObj.day}
                    </span>
                )
            }
            monthContent.push(
                <li class={[classes, dayObj.className]}>
                    {day}
                </li>
            )
        })

        this.monthText.forEach((mth, index) => {
            monthPickerContent.push(<li onClick={() => this.handleChooseMonth(index + 1)}><span>{mth}</span></li>)
        })
        for (let i = 0; i < 12; i++) {
            yearPickerContent.push(<li onClick={() => { this.handleChooseYear(this.minPickerYear + i) }}><span>{this.minPickerYear + i}</span></li>)
        }

        return (
            <div id="v-calendar" class={this.darkMode ? 'dark-mode' : 'light-mode'}>
                <div class='header'>
                    {headerContent}
                </div >
                <div class='content'>
                    <ul class='week'>
                        {weekContent}
                    </ul>
                    <ul class='month'>
                        {monthContent}
                    </ul>
                    {
                        (this.isSwitchYear || this.isSwitchMonth) && <ul class="picker">
                            {this.isSwitchYear && yearPickerContent}
                            {this.isSwitchMonth && monthPickerContent}
                        </ul>
                    }
                </div>
            </div >
        )
    }
};



