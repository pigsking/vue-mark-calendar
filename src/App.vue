<template>
  <div id="app">
    <div id="calendar">
      <Calendar ref="calendar" :markers="markers" :disabledFutureDay="disabledFutureDay" 
      :hideOtherMonthDay="hideOtherMonthDay" @month="handleMonthChange($event)" @day="handleDayChange($event)" 
      />
    </div>
    <div class="control">
      <input type="date" v-model="currentDate" @change="handleDateChange">
    <ul class="options">
      <li>
        <label for="disabledFutureDay">Disabled Future</label>
        <input type="checkbox" id="disabledFutureDay" v-model="disabledFutureDay">
      </li>
      <li>
        <label for="hideOtherMonthDay">Hie other month days</label>
        <input type="checkbox" id="hideOtherMonthDay" v-model="hideOtherMonthDay">
      </li>
    </ul>
    </div>
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
      disabledFutureDay: false,
      hideOtherMonthDay: false,
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
  color: #fff;
  background-color: #7b1fa2;
}
#calendar /deep/ .miss span {
  color: #fff;
  background-color: #ff4081;
}

#calendar /deep/ .dream span {
  color: #fff;
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
