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
            type: String,
            default: "YYYY/MM/DD"
        },
        sundayBegin: {
            type: Boolean,
            default: false
        },
        weekText: {
            type: Array,
            default: () => ["一", "二", "三", "四", "五", "六", "日"]
        }
    },
    data() {
        return {
            days: [],
            currentDate: ""
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
        sundayBegin() {
            this.initCalendar(this.currentDate)
        },
        hideMarker() {
            this.initCalendar(this.currentDate)
        },
        hideOtherMonthMarker() {
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

            const currentMonthAllDays = this.handleDays(year, month);
            let prevMonthAllDays = this.handleDays(year, prevMonth, "prev");
            let nextMonthAllDays = this.handleDays(year, nextMonth, "next");

            // get the first day and the last day of the month is the day of the week
            let firstDay = currentMonthAllDays[0].week;
            let lastDay = currentMonthAllDays[currentMonthAllDays.length - 1].week;

            // handle sunday begin
            if (this.sundayBegin) {
                lastDay = lastDay === 7 ? (lastDay = 1) : lastDay + 1;
            } else {
                firstDay -= 1;
            }

            // concat prev month and next month
            const nextMonthFewDays = nextMonthAllDays.splice(0, 7 - lastDay);

            const prevMonthFewDays = prevMonthAllDays.splice(
                prevMonthAllDays.length - firstDay,
                prevMonthAllDays.length - 1
            );

            this.days = [
                ...prevMonthFewDays,
                ...currentMonthAllDays,
                ...nextMonthFewDays
            ];
            this.currentDate = date;
        },

        /**
         * @description get the total days in the month
         * @param {Number} year
         * @param {Number} month
         * @param {String} type
         * @return {Array} days
         */
        handleDays(year, month, type) {
            let days = [];

            const markers = this.markers;
            const hideOtherMonthMarker = this.hideOtherMonthMarker;
            const hideMarker = this.hideMarker
            const totalDays = this.getTotalDays(year, month);

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
                    isFutureDay: this.getDateObj().timestamp < timestamp
                };

                // // add marker
                if (!hideMarker) {
                    if (!(hideOtherMonthMarker && dayObj.isOtherMonthDay)) {
                        markers.forEach(item => {
                            if (this.getDateObj(item.date).date === dayObj.date)
                                dayObj["className"] = item.className;
                        });
                    }
                }

                days.push(dayObj);
            }
            return days;
        },
        /**
         * @description switch month
         * @param {String} type prev or next
         */
        handleMonthSwitch(type) {
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
        handleDayChoose(item) {
            if (!(this.disabledFutureDay && item.isFutureDay)) {
                if (item.isOtherMonthDay) {
                    item.day > 7
                        ? this.handleMonthSwitch("prev")
                        : this.handleMonthSwitch("next");
                }
                this.currentDate = item.date;
            }
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
            this.currentDate = this.getDateObj(date).date;
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
            const dateObj = date ? new Date(date.replace(/-/g, "/")) : new Date()
            const year = dateObj.getFullYear(), month = dateObj.getMonth() + 1, day = dateObj.getDate();
            return {
                year: year,
                month: month,
                day: day,
                week: dateObj.getDay() || 7,
                timestamp: dateObj.getTime(),
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
        }
    },
    render() {
        let weekContent = []
        let monthContent = []

        const dateFormatFilter = (date) => {
            if(date){
                const connector = date.match(/[^0-9]/)[0];
                const formatDate = this.getDateObj(date, "YYYY/MM").date;
                return formatDate.split("/").join(connector);
            }
        }
        const headerContent = (
            <div class="month-switch">
                <span class="prev" onClick={() => this.handleMonthSwitch('prev')}></span>
                <span class="date">{dateFormatFilter(this.currentDate)}</span>
                {this.showNextMonthSwitch &&
                    <span class="next" onClick={() => this.handleMonthSwitch('next')}></span>}
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
                "future-day": this.disabledFutureDay && dayObj.isFutureDay,
                "weekend-day":
                    !(this.disabledFutureDay && dayObj.isFutureDay) &&
                    [6, 7].includes(dayObj.week),
                "choose-day": this.currentDate === dayObj.date,
                "other-month-day": dayObj.isOtherMonthDay
            };

            if (!(dayObj.isOtherMonthDay && this.hideOtherMonthDay)) {
                day = (
                    <span onClick={() => this.handleDayChoose(dayObj, index)}>
                        {dayObj.day}
                    </span>
                )
            }
            monthContent.push(
                <li class={[classes, dayObj.className]}>
                    {day}
                </li>
            )
        })
        return (
            <div id="calendar">
                <div class="calendar-header">
                    {headerContent}
                </div >
                <div class="calendar-content">
                    <ul class="week">
                        {weekContent}
                    </ul>
                    <ul class="month">
                        {monthContent}
                    </ul>
                </div>
            </div >
        )
    }
};



