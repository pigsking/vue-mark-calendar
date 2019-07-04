<template>
  <div id="calendar">
    <div class="calendar-header">
      <div class="month-switch">
        <span class="prev" @click="handleMonthSwitch('prev')"></span>
        <span>{{yearMonth}}</span>
        <span class="next" @click="handleMonthSwitch('next')"></span>
      </div>
    </div>
    <div class="calendar-content">
      <ul class="week">
        <li v-for="(day,index) in weekTxt" :key="index">{{day}}</li>
      </ul>
      <ul class="month">
        <li v-for="(item,index) in days" :key="index" :class="[dayClasses(item), item.className]">
          <span
            @click="handleDayChoose(item,index)"
            v-if="!(item.isOtherMonthDay&&hideOtherMonthDay)"
          >{{item.day}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import util from "./util";
export default {
  props: {
    markers: Array,
    weekText: Array,
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
    format: {
      type: String,
      default: "YYYY-MM-DD"
    },
    sundayBegin: Boolean
  },
  data() {
    return {
      days: [],
      currentDate: new Date().toLocaleDateString()
    };
  },
  computed: {
    weekTxt() {
      const weekText = ["S", "M", "T", "W", "T", "F", "S"];
      return (
        this.weekText ||
        (this.sundayBegin
          ? weekText
          : weekText.push(weekText.shift()) && weekText)
      );
    },
    yearMonth() {
      const connector = this.format.match(/[^A-Z]/)[0];
      const { year, month } = util.getDateObj(this.currentDate);
      return `${year}${connector}${month}`;
    }
  },

  watch: {
    currentDate(date) {
      this.$emit("date", this.matchDayByDate(date));
    }
  },
  mounted() {
    this.initCalendar();
  },
  methods: {
    dayClasses(item) {
      return {
        "choose-day": this.currentDate === item.date,
        "disabled-day": this.disabledFutureDay && item.isFutureDay,
        "other-month-day": item.isOtherMonthDay,
        "weekend-day": [0, 6, 7].includes(item.week)
      };
    },
    /**
     * @description init month
     */
    initCalendar() {
      const { year, month, day } = util.getDateObj(this.currentDate);
      const prevMonth = month === 1 ? 12 : month - 1;
      const nextMonth = month === 12 ? 1 : month + 1;

      const currentMonthAllDays = this.handleDays(year, month);
      let prevMonthAllDays = this.handleDays(year, prevMonth, true);
      let nextMonthAllDays = this.handleDays(year, nextMonth, true);

      // get the first day and the last day of the month is the day of the week
      let firstDay = currentMonthAllDays[0].week;
      let lastDay = currentMonthAllDays[currentMonthAllDays.length - 1].week;

      // handle sunday begin
      this.sundayBegin ? (lastDay += 1) : (firstDay -= 1);

      // concat prev month and next month

      const nextMonthFewDays = nextMonthAllDays.splice(0, 7 - lastDay);
      const prevMonthFewDays = prevMonthAllDays.splice(
        prevMonthAllDays.length - firstDay,
        prevMonthAllDays.length - 1
      );

      // concat prev last few days and next month first few days
      [...prevMonthFewDays, ...nextMonthFewDays].forEach(
        item => (item["isOtherMonthDay"] = true)
      );

      this.days = [
        ...prevMonthFewDays,
        ...currentMonthAllDays,
        ...nextMonthFewDays
      ];
    },
    /**
     * @description switch month
     * @param {String} type prev or next
     */
    handleMonthSwitch(type) {
      // prev month
      let { year, month, day } = util.getDateObj(this.currentDate);

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
      this.initCalendar();
      const switchAfterMonthTotalDays = util.getTotalDays(year, month);
      // avoid month cross-border
      const today = util.getDateObj().day > switchAfterMonthTotalDays;
      const choosedDday = day > switchAfterMonthTotalDays;

      if (today || choosedDday) {
        day = switchAfterMonthTotalDays;
      }
      this.currentDate = this.formatDate(`${year}/${month}/${day}`);
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
        this.initCalendar();
        this.currentDate = item.date;
      }
    },

    /**
     * @description get the total days in the month
     * @param {Number} year
     * @param {Number} month
     * @return {Array} days
     */
    handleDays(year, month, isOtherMonths) {
      let days = [];
      const totalDays = util.getTotalDays(year, month);
      if (isOtherMonths) {
        if (month === 1) year += 1;
        if (month === 12) year -= 1;
      }

      for (let i = 0; i < totalDays; i++) {
        const day = i + 1;
        const date = `${year}/${month}/${day}`;

        let week = util.getDateObj(date).week;
        if (!this.sundayBegin && week === 0) week = 7;

        const dayObj = {
          day: day,
          date: this.formatDate(date),
          week: week,
          isFutureDay: util.getTimestamp() < util.getTimestamp(date)
        };
        // add marker
        const markers = this.markers;
        if (markers && (!isOtherMonths || !this.hideOtherMonthMarker)) {
          markers.forEach(item => {
            const makerDate = util.getTimestamp(item.date);
            if (util.getTimestamp(dayObj.date) === makerDate) {
              dayObj["className"] = item.className;
            }
          });
        }
        days.push(dayObj);
      }
      return days;
    },
    /**
     * @description match month's day obj by the date string
     * @param {String} date
     */
    matchDayByDate(date) {
      if (!date) throw "Missing required parameters";
      return this.days.find(item => item.date === date);
    },
    // External method
    /**
     * @description need format date string
     * @param {String} date
     * @param {String} format string => default: 'YYYY-MM-DD'
     */
    formatDate(date, formatStr = this.format) {
      if (!date) throw "Missing required parameters";
      return util.formatDate(date, formatStr);
    },
    /**
     * @description choose target date
     * @param {String} date
     */
    chooseTargetDate(date) {
      if (!date) throw "Missing required parameters";
      this.currentDate = date;
    }
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
}
ul {
  margin: 0;
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

.month-switch {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  padding: 0 20px;
  background-color: #232323;
}
.month-switch .prev,
.month-switch .next {
  width: 12px;
  height: 12px;
  border-top: 1px solid #fff;
  border-right: 1px solid #fff;
  cursor: pointer;
}

.month-switch .prev {
  transform: rotate(-135deg);
}

.month-switch .next {
  transform: rotate(45deg);
}
.calendar-content {
  color: #232323;
  background-color: #fff;
}
.week {
  display: flex;
  padding: 10px 0;
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
  text-align: center;
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
  color: #fff;
  background-color: #232323;
}

#calendar .other-month-day span {
  color: #ccc;
}

#calendar .disabled-day span {
  color: #ccc;
  background-color: transparent;
}
</style>

