<template>
  <div id="app">
    <div id="calendar">
      <Calendar ref="calendar" :markers="markers" :disabledFuture="disabledFuture" :hideOtherMonthDays="hideOtherMonthDays" @month="handleMonthChange($event)" @day="handleDayChange($event)" />
    </div>
    <ul class="options">
      <li>
        <label for="disabledFuture">Disabled Future</label>
        <input type="checkbox" id="disabledFuture" v-model="disabledFuture">
      </li>
      <li>
        <label for="hideOtherMonthDays">Hie other month days</label>
        <input type="checkbox" id="hideOtherMonthDays" v-model="hideOtherMonthDays">
      </li>
    </ul>
    <input type="date" v-model="currentDate" @change="handleDateChange">
  </div>
</template>

<script>
import Calendar from "./components/Calendar.vue";

export default {
  name: "app",
  components: {
    Calendar
  },
  data() {
    return {
      markers: [
        {
          date: "2018-10-20",
          className: "love"
        },
        {
          date: "2018-10-30",
          className: "miss"
        },
        {
          date: "2018-10-1",
          className: "dream"
        }
      ],
      disabledFuture: false,
      hideOtherMonthDays: false,
      currentDate: ""
    };
  },
  methods: {
    handleDayChange(date) {
      this.currentDate = date;
    },
    handleMonthChange(date) {
      this.currentDate = date;
    },
    handleDateChange() {
      this.$refs.calendar.chooseSpecifiedDate(this.currentDate);
    }
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}
ul {
  padding-left: 0;
}
li {
  list-style: none;
}

#calendar {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#calendar /deep/ .love span {
  color: #fff!important;
  background-color: #7b1fa2;
}
#calendar /deep/ .miss span {
  color: #fff!important;
  background-color: #ff4081;
}

#calendar /deep/ .dream span {
  color: #fff!important;
  background-color: #448aff;
}

.options {
  padding: 10px;
}
.current-date {
  text-align: center;
  color: #232323;
}
</style>
