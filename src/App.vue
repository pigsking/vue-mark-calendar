<template>
  <div id="calendar-wrap">
    <Calendar
      ref="calendar"
      @date="handleDateChange($event)"
      :format="props.format"
      :markers="props.markers"
      :sundayBegin="props.sundayBegin"
      :disabledFutureDay="props.disabledFutureDay"
      :hideOtherMonthDay="props.hideOtherMonthDay"
      :hideOtherMonthMarker="props.hideOtherMonthMarker"
    />
    <!-- <button @click="handleBackToToday()">回到今天</button> -->
    <div class="copyright">Copyright © {{new Date().getFullYear()}} Allen AuYeung</div>
  </div>
</template>

<script>
// import Calendar from "../packages/calendar/Calendar.vue";

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;

export default {
  components: {
    // Calendar
  },
  data() {
    return {
      props: {
        format: "YYYY-MM-DD",
        weekText: ["日", "一", "二", "三", "四", "五", "六"],
        sundayBegin: false,
        disabledFutureDay: false,
        hideOtherMonthDay: false,
        hideOtherMonthMarker: false,
        markers: [
          {
            date: `${year}-${month}-1`,
            className: "dream"
          },
          {
            date: `${year}-${month}-20`,
            className: "love"
          },
          {
            date: `${year}-${month}-30`,
            className: "miss"
          },
          {
            date: `${year}-${month + 1}-1`,
            className: "hope"
          }
        ]
      }
    };
  },
  methods: {
    handleDateChange(obj) {
      const dayInfo = JSON.stringify(obj);
      console.log(dayInfo)
    },
    handleBackToToday() {
      this.$refs.calendar.chooseDate();
    }
  }
};
</script>

<style scoped>
#calendar-wrap {
  /* padding-bottom: 30px; */
  color: #2c3e50;
}
/* marker */
#calendar-wrap {
  max-width: 414px;
  margin: auto;
  /* background-color: #fff; */
}
/* #calendar {
  min-width: 100px !important;
} */
/* marker style*/
#calendar-wrap >>> .love span {
  color: #fff;
  background-color: #7b1fa2;
}
#calendar-wrap >>> .miss span {
  color: #fff;
  background-color: #ff4081;
}

#calendar-wrap >>> .dream span {
  color: #fff;
  background-color: #448aff;
}

#calendar-wrap >>> .hope span {
  color: #fff;
  background-color: #ff5722;
}

#calendar-wrap >>> .weekend-day span {
  color: #536dfe;
}

/* copyright */
.copyright {
  padding: 30px 0;
  text-align: center;
  color: #ccc;
  font-size: 12px;
  background-color: #efefef;
}
</style>
