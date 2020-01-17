<template>
  <div id="calendar">
    <div class="calendar-header">
      <div class="month-switch">
        <span class="prev" @click="handleMonthSwitch('prev')"></span>
        <span class="date">{{currentDate|format}}</span>
        <span class="next" @click="handleMonthSwitch('next')" v-if="showNextMonthSwitch"></span>
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
import utils from "./utils";

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
      let show = true;
      if (this.disabledFutureDay) {
        const { year: todayY, month: todayM } = this.getDateObj();
        const { year, month } = this.getDateObj(this.currentDate);

        if (year === todayY && todayM === month) show = false;
      }
      return show;
    }
  },
  filters: {
    format(date) {
      if (date) {
        const connector = date.match(/[^0-9]/)[0];
        const formatDate = utils.getDateObj(date, "YYYY/MM").date;
        return formatDate.split("/").join(connector);
      }
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
        "weekend-day": [6, 7].includes(item.week)
      };
    },
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
     * @return {Array} days
     */
    handleDays(year, month, type) {
      let days = [];

      const markers = this.markers;
      const hideOtherMonthMarker = this.hideOtherMonthMarker;
      const totalDays = utils.getTotalDays(year, month);

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
          isOtherMonthDay: ["prev", "next"].includes(type),
          isFutureDay: this.getDateObj().timestamp < timestamp
        };

        // add marker
        // !(this.disabledFutureDay && dayObj.isFutureDay) &&
        if (!(hideOtherMonthMarker && dayObj.isOtherMonthDay)) {
          markers.forEach(item => {
            if (this.getDateObj(item.date).date === dayObj.date)
              dayObj["className"] = item.className;
          });
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

      const switchAfterMonthTotalDays = utils.getTotalDays(year, month);
      // avoid month cross-border
      // const today = this.getDateObj().day > switchAfterMonthTotalDays;
      // const choosedDday = day > switchAfterMonthTotalDays;

      if (day > switchAfterMonthTotalDays) {
        day = switchAfterMonthTotalDays;
      }
      this.initCalendar(`${year}/${month}/${day}`);
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
     */
    matchDayByDate(date) {
      if (!date) throw "Missing required parameters";
      return this.days.find(item => item.date === date);
    },

    // External method
    /**
     * @description choose target date
     * @param {String} date
     */
    chooseTargetDate(date) {
      if (!date) throw "Missing required parameters";
      this.currentDate = date;
    },

    getDateObj(date, formatStr = this.format) {
      return utils.getDateObj(date, formatStr);
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
.month-switch .date {
  position: absolute;
  left: 0;
  right: 0;
  z-index: 0;
  margin: 0 30%;
  text-align: center;
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

