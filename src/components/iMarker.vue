<template>
  <div id="calendar">
    <div class="calendar-header">
      <slot name="month-switch" v-if="$slots['month-switch']"></slot>
      <div class="month-switch" v-else>
        <span class="prev" @click="handleMonthSwitch('prev')"></span>
        <span>{{currentDateObj.year}}-{{currentDateObj.month> 9 ? currentDateObj.month : "0" + currentDateObj.month}}</span>
        <span class="next" @click="handleMonthSwitch('next')"></span>
      </div>
    </div>
    <div class="calendar-content">
      <ul class="week">
        <li v-for="(day,index) in weekTxt" :key="index">{{day}}</li>
      </ul>
      <ul class="month">
        <li
          v-for="(item,index) in days"
          :key="index"
          @click="handleDayChoose(item,index)"
          :class="[dayClasses(item),item.className]"
        >
          <span>{{item.day}}</span>
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
      default: true
    },
    format: {
      type: String,
      default: "YYYY-MM-DD"
    },
    sundayBegin: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    weekTxt() {
      if (this.weekText) return this.weekText;
      const weekText = ["S", "M", "T", "W", "T", "F", "S"];
      if (!this.sundayBegin) weekText.push(weekText.shift());
      return weekText;
    }
  },
  data() {
    return {
      days: [],
      currentDateObj: {
        date: null,
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        day: new Date().getDate()
      }
    };
  },
  watch: {
    "currentDateObj.month"() {
      this.initCalendar();
    }
  },
  created() {
    this.initCalendar();
    this.currentDateObj.date = util.splicingDate(
      this.currentDateObj,
      this.format
    );
    this.$emit("day", this.currentDateObj.date);
  },
  methods: {
    dayClasses(item) {
      return {
        "choose-day": this.currentDateObj.day === item.day,
        "disabled-day": this.disabledFutureDay && item.isFutureDay,
        "other-month-day": item.isOtherMonthDay,
        "other-month-day--hide": this.hideOtherMonthDay && item.isOtherMonthDay,
        "other-month-marker--hide":
          this.hideOtherMonthMarker && item.isOtherMonthDay,
        "weekend-day": item.isWeekendDay
      };
    },
    /**
     * @description init month
     */
    initCalendar() {
      const { year, month } = this.currentDateObj;
      const prevMonth = month === 1 ? 12 : month - 1;
      const nextMonth = month === 12 ? 1 : month + 1;

      const currentMonthAllDays = this.handleDays(year, month);
      let prevMonthAllDays = this.handleDays(year, prevMonth, true);
      let nextMonthAllDays = this.handleDays(year, nextMonth, true);

      // get the first day and the last day of the month is the day of the week
      let firstDay = new Date(currentMonthAllDays[0].date).getDay();
      let lastDay = new Date(
        currentMonthAllDays[currentMonthAllDays.length - 1].date
      ).getDay();

      if (!this.sundayBegin) {
        firstDay -= 1;
      } else {
        lastDay += 1;
      }
      // concat prev month and next month
      const prevMonthFewDays = prevMonthAllDays.splice(
        prevMonthAllDays.length - firstDay,
        prevMonthAllDays.length - 1
      );
      const nextMonthFewDays = nextMonthAllDays.splice(0, 7 - lastDay);

      // concat prev last few days and next month first few days
      prevMonthFewDays
        .concat(nextMonthFewDays)
        .map(item => (item["isOtherMonthDay"] = true));

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
      let { year, month } = this.currentDateObj;
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

      const switchAfterMonthTotalDays = util.getTotalDays(year, month);
      // avoid cross-border
      if (
        new Date().getDate() > switchAfterMonthTotalDays ||
        this.currentDateObj.day > switchAfterMonthTotalDays
      ) {
        this.currentDateObj.day = switchAfterMonthTotalDays;
      }

      this.currentDateObj.year = year;
      this.currentDateObj.month = month;
      this.currentDateObj.date = util.splicingDate(
        this.currentDateObj,
        this.format
      );
      this.$emit("month", this.currentDateObj.date);
    },
    /**
     * @description choose one day
     * @param {Object} item
     */
    handleDayChoose(item) {
      if (
        (this.disabledFutureDay && item.isFutureDay) ||
        (this.hideOtherMonthDay && item.isOtherMonthDay)
      ) {
        return;
      }

      this.currentDateObj.day = item.day;
      this.currentDateObj.date = item.date;

      this.$emit("day", util.splicingDate(this.currentDateObj, this.format));

      item.isOtherMonthDay &&
        (item.day > 7
          ? this.handleMonthSwitch("prev")
          : this.handleMonthSwitch("next"));
    },

    /**
     * @description get the total days in the month
     * @param {Number} year
     * @param {Number} month
     * @return {Array} days
     */
    handleDays(year, month, isOtherMonths = false) {
      let days = [];
      const totalDays = util.getTotalDays(year, month);
      if (isOtherMonths) {
        if (month === 1) year += 1;
        if (month === 12) year -= 1;
      }

      for (let i = 0; i < totalDays; i++) {
        const day = i + 1;
        const date = util.splicingDate({ year, month, day });
        const dayObj = {
          day: day,
          date: date,
          isFutureDay: util.getTimestamp() < util.getTimestamp(date),
          isWeekendDay: util.isWeekend(date)
        };

        // add marker
        const markers = this.markers;

        if (markers && (!isOtherMonths || !this.hideOtherMonthMarker)) {
          markers.map(item => {
            if (
              util.getTimestamp(dayObj.date) === util.getTimestamp(item.date)
            ) {
              dayObj["className"] = item.className;
            }
          });
        }

        days.push(dayObj);
      }
      return days;
    },

    /**
     * @description choose target date
     * @param {String} date
     */
    chooseTargetDate(date) {
      if (!date) throw "Missing required parameters";

      const [y, m, day] = date.split("-");
      const { year, month } = this.currentDateObj;

      this.currentDateObj.day = +day;
      this.currentDateObj.date = date;

      // not init this month
      if (y != year && m != month) {
        this.currentDateObj.year = +y;
        this.currentDateObj.month = +m;
        this.initCalendar();
      }
    },
    // External method
    switchToPrevMonth() {
      this.handleMonthSwitch("prev");
    },
    switchToNextMonth() {
      this.handleMonthSwitch("next");
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
#calendar .other-month-day.other-month-day--hide span {
  color: transparent;
  background-color: transparent;
}
#calendar .disabled-day span {
  color: #ccc;
  background-color: transparent;
}

#calendar .other-month-day.other-month-marker--hide span {
  background-color: transparent !important;
}
</style>

