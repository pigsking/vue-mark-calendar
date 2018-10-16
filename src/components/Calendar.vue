<template>
  <div id="calendar">
    <div class="calendar-header">
      <div class="month-switch">
        <span @click="handleMonthSwitch('prev')">Prev</span>
        <span @click="state.showYears=true"> {{current.year}} - {{current.month}}</span>
        <span @click="handleMonthSwitch('next')">Next</span>
      </div>
      <ul class="years" v-show="state.showYears">
        <li v-for="item in 200" :key="item" @click="handleYearChoose(item)">
          {{1900+item}}
        </li>
      </ul>
      <ul class="months" v-show="state.showMonths">
        <li v-for="item in 12" :key="item" @click="handleMonthChoose(item)">
          {{item}}
        </li>
      </ul>
    </div>
    <div class="calendar-content">
      <ul class="week">
        <li v-for="(day,index) in weekText" :key="index">{{day}}</li>
      </ul>
      <ul class="month">
        <li v-for="(item,index) in days" :key="index" @click="handleDayChoose(item,index)" :class="[dayClasses(item,index),item.className]">
          <span>{{item.day}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import util from '@/util'
export default {
  props: {
    markers: Array,
    weekText: {
      type: Array,
      default: () => ['日', '一', '二', '三', '四', '五', '六']
    },
    disabledFuture: {
      type: Boolean,
      default: false
    },
    hideOtherMonthDays: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      years: [],
      months: [],
      days: [],
      minMonths: [4, 6, 9, 11],
      current: {
        date: null,
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        day: null
      },
      startYear: 1970,
      todayDate: null,
      state: {
        showYears: false,
        showMonths: false
      }
    }
  },
  watch: {
    'current.month'() {
      this.initMonth()
    },
    hideOtherMonthDays() {
      this.initMonth()
    }
  },
  created() {
    this.getTodayDate()
    this.initMonth()
  },
  methods: {
    dayClasses(item, index) {
      const { date } = this.current
      const isOtherMonthDays =
        (item.day > 7 && index < 7) || (item.day < 7 && index > 28)
      return {
        'choose-day': item.date === date,
        'disabled-day':
          this.disabledFuture && item.isFutureDay && !this.hideOtherMonthDays,
        'other-month-day': isOtherMonthDays,
        'other-month-day--hide': this.hideOtherMonthDays && isOtherMonthDays
      }
    },
    handleYearChoose(index) {
      this.state.showYears = false
      this.state.showMonths = true

      this.current.year = 1900 + index
    },
    handleMonthChoose(index) {
      this.state.showMonths = false

      this.current.month = index
      // this.initMonth()
      this.$emit('month', this.converDate())
    },

    /**
     * @description conver date by lang
     * @param {String} year
     * @param {String} month
     * @param {String} day
     * @return {String}
     */
    converDate(
      year = this.current.year,
      month = this.current.month,
      day = this.current.day
    ) {
      day = day < 9 ? '0' + day : day
      return `${year}-${month}-${day}`
    },
    /**
     * @description get today's date
     */
    getTodayDate() {
      const date = new Date()
      const { year, month } = this.current
      // this.todayDate = `${year}-${month}-${date.getDate()}`

      // init choose tody
      this.current.day = date.getDate()
      // this.current.date = this.todayDate
      this.$emit('day', this.converDate())
      // this.initMonth()
    },
    /**
     * @description init month
     */
    initMonth() {
      let { year, month } = this.current
      const prevMonth = month === 1 ? (month = 12) : month - 1
      const nextMonth = month === 12 ? (month = 1) : month + 1

      const currentMonthAllDays = this.getTotalDays(year, month)

      let prevMonthDays = this.getTotalDays(year, prevMonth)
      let nextMonthDays = this.getTotalDays(year, nextMonth)

      // get the first day and the last day of the month is the day of the week
      const firstDay = new Date(currentMonthAllDays[0].date).getDay()
      const lastDay = new Date(
        currentMonthAllDays[currentMonthAllDays.length - 1].date
      ).getDay()

      // concat prev month and next month
      const prevMonthFewDays = prevMonthDays.splice(
        prevMonthDays.length - firstDay,
        prevMonthDays.length - 1
      )
      const nextMonthFewDays = nextMonthDays.splice(0, 7 - (lastDay + 1))
      this.days = [
        ...prevMonthFewDays,
        ...currentMonthAllDays,
        ...nextMonthFewDays
      ]
    },
    /**
     * @description get the total days in the month
     * @param {Number} year
     * @param {Number} month
     * @return {Array} days
     */
    getTotalDays(year, month) {
      let totalDays
      let days = []

      if (month == 2) {
        totalDays = util.isLeapYear(year) ? 29 : 28
      } else {
        totalDays = this.minMonths.includes(month) ? 30 : 31
      }

      for (let i = 0; i < totalDays; i++) {
        const day = i + 1
        const date = this.converDate(year, month, day)
        let dayObj = {
          day: day,
          date: date,
          timeStamp: new Date(date).getTime()
        }

        dayObj.isFutureDay =
          new Date(this.todayDate).getTime() < dayObj.timeStamp ? true : false

        // add marker
        this.markers.map(item => {
          if (dayObj.date === item.date) {
            dayObj.className = item.className
          }
        })
        days.push(dayObj)
      }
      return days
    },

    /**
     * @description switch month
     * @param {String} type prev or next
     */
    handleMonthSwitch(type) {
      // prev month
      let { year, month } = this.current
      if (type === 'prev') {
        if (month > 1) {
          month--
        } else {
          year--
          month = 12
        }
      }
      // next month
      if (type === 'next') {
        if (month < 12) {
          month++
        } else {
          year++
          month = 1
        }
      }
      this.current.year = year
      this.current.month = month > 9 ? month : '0' + month

      const date = this.converDate()
      this.$emit('month', date)
      // this.initMonth()
    },
    /**
     * @description choose one day
     * @param {Number} day one day
     */
    handleDayChoose(item, index) {
      this.current.day = item.day

      const date = this.converDate()

      this.$emit('day', date)

      // switch to prev month
      if (item.day > 7 && index < 7) {
        this.handleMonthSwitch('prev')
      }
      // switch to next month
      if (item.day < 7 && index > 28) {
        this.handleMonthSwitch('next')
      }

      if (!this.disabledFuture) {
        this.current.date = item.date
      } else {
        // handle disabled
        if (!item.isFutureDay) {
          this.current.date = item.date
        }
      }
    },
    chooseSpecifiedDate(date) {
      const dateArr = date.split('-')
      this.current.year = dateArr[0]
      this.current.month = dateArr[1]
      this.current.day = dateArr[2]

      this.current.date = date
      this.initMonth()
    }
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
}
ul {
  padding-left: 0;
}
li {
  list-style: none;
}

#calendar {
  min-width: 320px;
  color: #fff;
}
.calendar-header {
  position: relative;
}
.calendar-header .years,
.calendar-header .months {
  overflow: hidden;
  position: absolute;
  left: 0;
  right: 0;
  display: flex;
  flex-wrap: wrap;
  max-height: 300px;
  margin-top: 0;
  border-top: 1px solid #fff;
  background-color: #232323;
}
.calendar-header .years li,
.calendar-header .months li {
  width: 25%;
  height: 40px;
  line-height: 40px;
  text-align: center;
}

.month-switch {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  padding: 0 10px;
  background-color: #232323;
}
.month-switch .disabled-switch {
  color: #333;
}
.calendar-content {
  color: #232323;
  background-color: #fff;
}
.week {
  display: flex;
}
.week li {
  flex: 1;
  text-align: center;
  cursor: pointer;
}
.month {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 0;
}
.month li {
  width: 14.28%;
  margin-bottom: 10px;
}
.month span {
  display: inline-block;
  width: 40px;
  height: 40px;
  line-height: 40px;
  border-radius: 50%;
  text-align: center;
  cursor: pointer;
}
/* #calendar .month span:hover {
  color: #999;
  background-color: #ccc;
} */
#calendar .choose-day span {
  color: #fff;
  background-color: #232323;
}

#calendar .other-month-day span {
  color: #ccc;
}
#calendar .other-month-day--hide span {
  color: transparent;
}
#calendar .disabled-day span {
  color: #ccc;
  background-color: transparent;
}
</style>

