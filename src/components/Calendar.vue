<template>
  <div id="calendar">
    <div class="calendar-header">
      <div class="month-switch">
        <span @click="handleMonthSwitch('prev')">Prev</span>
        <span @click="state.showYears=true"> {{current.year}} - {{current.month}}</span>
        <span @click="handleMonthSwitch('next')">Next</span>
      </div>
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
import util from "@/util";
export default {
  props: {
    markers: Array,
    weekText: {
      type: Array,
      default: () => ["日", "一", "二", "三", "四", "五", "六"]
    },
    disabledFutureDay: {
      type: Boolean,
      default: false
    },
    hideOtherMonthDay: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      days: [],
      current: {
        date: null,
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        day: new Date().getDate()
      }
    };
  },
  watch: {
    "current.month"() {
      this.initCalendar();
    },
    hideOtherMonthDay() {
      this.initCalendar();
    }
  },
  mounted() {
    this.initCalendar();
    this.$emit("day", util.splicingDate(this.current));
  },
  methods: {
    initCalendar() {
      this.days = util.initCalendar(this.current, this.markers);
    },
    dayClasses(item, index) {
      const { date } = this.current;
      return {
        "choose-day": item.date === date,
        "disabled-day": this.disabledFutureDay && item.isFutureDay,
        "other-month-day": item.isOtherMonthDay,
        "other-month-day--hide": this.hideOtherMonthDay && item.isOtherMonthDay
      };
    },

    /**
     * @description switch month
     * @param {String} type prev or next
     */
    handleMonthSwitch(type) {
      // prev month
      let { year, month } = this.current;
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
      this.current.year = year;
      this.current.month = month > 9 ? month : "0" + month;

      const date = util.splicingDate(this.current);
      this.$emit("month", date);
      // this.initMonth()
    },
    /**
     * @description choose one day
     * @param {Number} day one day
     */
    handleDayChoose(item, index) {
      if (
        (this.disabledFutureDay && item.isFutureDay) ||
        (this.hideOtherMonthDay && item.isOtherMonthDay)
      ) {
        return;
      }

      this.current.day = item.day;
      this.current.date = item.date;
      const date = util.splicingDate(this.current);

      this.$emit("day", date);

      // switch to prev month
      if (item.day > 7 && index < 7) {
        this.handleMonthSwitch("prev");
      }
      // switch to next month
      if (item.day < 7 && index > 28) {
        this.handleMonthSwitch("next");
      }
    },
    chooseSpecifiedDate(date) {
      const dateArr = date.split("-");
      this.current.year = dateArr[0];
      this.current.month = dateArr[1];
      this.current.day = dateArr[2];

      this.current.date = date;
      this.initMonth();
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
  background-color: transparent;
}
#calendar .disabled-day span {
  color: #ccc;
  background-color: transparent;
}
</style>

