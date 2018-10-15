<template>
  <div id="calendar">
    <div class="month-switch">
      <span @click="handleMonthSwitch('prev')">Prev</span>
      {{current.year}} - {{current.month<10?'0'+current.month:current.month}} <span @click="handleMonthSwitch('next')">Next</span>
    </div>
    <ul class="week">
      <li v-for="(day,index) in week" :key="index">{{day}}</li>
    </ul>
    <ul class="month">
      <li v-for="(item,index) in days" @click="handleDayChoose(item,index)" :class="[item.className,{'choose-day':item.date===current.date,'disabled-day':disabledFuture&&item.isFutureDay,'other-month':item.day>7&&index<7||item.day<7&&index>28}]">
        <span>{{item.day}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    markers: Array,
    disabledFuture: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      years: [],
      months: [],
      days: [],
      week: ['日', '一', '二', '三', '四', '五', '六'],
      minMonths: [4, 6, 9, 11],
      current: {
        date: null,
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        day: null
      },
      todayDate: null
    }
  },
  watch: {
    english() {
      this.current.date = this.converDate()
      this.$emit('day', this.current.date)
    }
  },
  created() {
    this.getTodayDate()
    this.initMonth()
  },
  methods: {
    /**
     * @description check the leap year
     * @param {Number} year
     * @return {Boolean}
     */
    isLeapYear(year) {
      return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0
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
      this.todayDate = `${year}-${month}-${date.getDate()}`

      // init choose tody
      this.current.day = date.getDate()
      this.current.date = this.todayDate
      this.$emit('day', this.current.date)
    },
    /**
     * @description init month
     */
    initMonth() {
      const { year, month } = this.current
      const currentMonthAllDays = this.getTotalDays(year, month)
      const prevMonthDays = this.getTotalDays(
        year,
        month === 1 ? (month = 12) : month - 1
      )
      const nextMonthDays = this.getTotalDays(
        year,
        month === 12 ? (month = 1) : month + 1
      )

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

      if (month === 2) {
        totalDays = this.isLeapYear(year) ? 29 : 28
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
      if (type === 'prev') {
        if (this.current.month > 1) {
          this.current.month--
        } else {
          this.current.year--
          this.current.month = 12
        }
      }
      // next month
      if (type === 'next') {
        if (this.current.month < 12) {
          this.current.month++
        } else {
          this.current.year++
          this.current.month = 1
        }
      }

      const date = this.converDate()

      this.$emit('month', date)
      this.initMonth()
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
      console.log(dateArr)
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
  padding: 10px;
  color: #fff;
  background-color: #232323;
}
.month-switch {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
}
.month-switch .disabled-switch {
  color: #333;
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
#calendar .choose-day span {
  color: #232323;
  background-color: #fff;
}
#calendar .other-month span {
  color: #333;
}
#calendar .disabled-day span {
  color: #333;
  background-color: transparent;
}
</style>

