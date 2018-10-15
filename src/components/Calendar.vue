<template>
  <div id="calendar">
    <div class="month-switch">
      <span @click="handleMonthSwitch('prev')">Prev</span>
      {{currentYear}} / {{currentMonth<10?'0'+currentMonth:currentMonth}} <span @click="handleMonthSwitch('next')">Next</span>
    </div>
    <ul class="week">
      <li v-for="(day,index) in week" :key="index">{{day}}</li>
    </ul>
    <ul class="month">
      <li v-for="(item,index) in days" @click="handleDayChoose(item,index)" :class="[item.className,{'choose-day':item.date===chooseDate,'disabled-day':disabledFuture&&item.isFutureDay,'other-month':item.day>7&&index<7||item.day<7&&index>28}]">
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
    },
    english: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      minMonths: [4, 6, 9, 11],

      currentYear: new Date().getFullYear(),
      currentMonth: new Date().getMonth() + 1,
      days: null, // the total days in the month
      chooseDate: null,
      chooseDay: null,
      todayDate: null
    }
  },
  computed: {
    week() {
      return this.english
        ? ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
        : ['日', '一', '二', '三', '四', '五', '六']
    }
  },
  created() {
    this.getTodayDate()
    this.initMonth(this.currentYear, this.currentMonth)
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
     * @description get today's date
     */
    getTodayDate() {
      const date = new Date()
      this.todayDate = `${this.currentYear}/${
        this.currentMonth
      }/${date.getDate()}`
      // this.todayDay = date.getDate()

      // init choose tody
      this.chooseDay = date.getDate()
      this.chooseDate = this.todayDate
      this.$emit('day', this.chooseDate)
    },
    /**
     * @description init month
     * @param {Number} year
     * @param {Number} month
     */
    initMonth(year, month) {
      const currentMonthDays = this.getTotalDays(year, month)
      const prevMonthDays = this.getTotalDays(
        year,
        month === 1 ? (month = 12) : month - 1
      )
      const nextMonthDays = this.getTotalDays(
        year,
        month === 12 ? (month = 1) : month + 1
      )

      // get the first day and the last day of the month is the day of the week
      const firstDay = new Date(currentMonthDays[0].date).getDay()
      const lastDay = new Date(
        currentMonthDays[currentMonthDays.length - 1].date
      ).getDay()

      // concat prev month and next month
      const prevMonthSpliceDays = prevMonthDays.splice(
        prevMonthDays.length - firstDay,
        prevMonthDays.length - 1
      )
      const nextMonthSpliceDays = nextMonthDays.splice(0, 7 - (lastDay + 1))

      this.days = [
        ...prevMonthSpliceDays,
        ...currentMonthDays,
        ...nextMonthSpliceDays
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
        let day = i + 1
        let date = `${year}/${month}/${day}`

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
        if (this.currentMonth > 1) {
          this.currentMonth--
        } else {
          this.currentYear--
          this.currentMonth = 12
        }
      }
      // next month
      if (type === 'next') {
        if (this.currentMonth < 12) {
          this.currentMonth++
        } else {
          this.currentYear++
          this.currentMonth = 1
        }
      }
      const date = `${this.currentYear}/${this.currentMonth}/${this.chooseDay}`
      this.$emit('month', date)
      this.initMonth(this.currentYear, this.currentMonth)
    },
    /**
     * @description choose one day
     * @param {Number} day one day
     */
    handleDayChoose(item, index) {
      this.chooseDay = item.day
      const date = `${this.currentYear}/${this.currentMonth}/${item.day}`
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
        this.chooseDate = item.date
      } else {
        // handle disabled
        if (!item.isFutureDay) {
          this.chooseDate = item.date
        }
      }
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

