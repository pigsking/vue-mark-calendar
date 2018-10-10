<template>
  <div id="calendar">
    <header>
      <span @click="switchMonth('prev')">Prev</span>
      {{currentYear}} / {{currentMonth<10?'0'+currentMonth:currentMonth}} <span @click="switchMonth('next')">Next</span>
    </header>
    <ul class="week">
      <li v-for="(day,index) in week" :key="index">{{day}}</li>
    </ul>
    <ul class="month">
      <li v-for="(item,index) in days" @click="chooseDay(item,index)" :class="{'choose-day':item.date===chooseDate,'other-month':item.day>7&&index<7||item.day<7&&index>28}">
        <span>{{item.day}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      week: ['日', '一', '二', '三', '四', '五', '六'],
      days: null,
      chooseDate: null,
      minMonths: [4, 6, 9, 11],
      // current: {
      //   year: new Date().getFullYear(),
      //   month: new Date().getMonth() + 1,
      //   day: null,
      //   date: null
      // },
      currentYear: new Date().getFullYear(),
      currentMonth: new Date().getMonth() + 1
    }
  },
  created() {
    this.initMonth(this.currentYear, this.currentMonth)
    this.initChooseDay()
  },
  methods: {
    isLeapYear(year) {
      if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) return true
      else return false
    },

    initMonth(year, month) {
      const currentMonthDays = this.getMonthDays(year, month)
      const prevMonthDays = this.getMonthDays(
        year,
        month === 1 ? (month = 12) : month - 1
      )
      const nextMonthDays = this.getMonthDays(
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
    getMonthDays(year, month) {
      let maxDay
      let days = []
      if (month === 2) {
        maxDay = this.isLeapYear(year) ? 29 : 28
      } else {
        maxDay = this.minMonths.includes(month) ? 30 : 31
      }
      for (let i = 0; i < maxDay; i++) {
        let day = {
          day: i + 1,
          date: `${year}/${month}/${i + 1}`
        }
        days.push(day)
      }
      return days
    },
    /**
     * @description init choose one day
     */
    initChooseDay() {
      const date = new Date()
      const today = (this.today = date.getDate())
      this.chooseDay(today)
    },
    /**
     * @description switch month
     * @param {String} type prev or next
     */
    switchMonth(type) {
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
      const date = `${this.currentYear}/${this.currentMonth}/${this.today}`
      this.$emit('month', date)
      this.initMonth(this.currentYear, this.currentMonth)
    },
    /**
     * @description choose one day
     * @param {Number} day one day
     */
    chooseDay(item, index) {
      const date = `${this.currentYear}/${this.currentMonth}/${item.day}`
      this.$emit('day', date)

      // switch to prev month
      if (item.day > 7 && index < 7) {
        this.switchMonth('prev')
      }
      // switch to next month
      if (item.day < 7 && index > 28) {
        this.switchMonth('next')
      }
      console.log(item.date)
      this.chooseDate = item.date
    }
  }
}
</script>

<style scoped>
ul {
  padding-left: 0;
}
li {
  list-style: none;
}

#calendar {
  padding: 20px 30px;
  color: #fff;
  background-color: #232323;
}
header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
}
.week {
  display: flex;
}
.week li {
  flex: 1;
  text-align: center;
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
  text-align: center;
}
.choose-day span{
  border-radius: 50%;
  color: #232323;
  background-color: #fff;
}
.other-month span{
  color: #333;
}
</style>

