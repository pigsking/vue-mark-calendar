<template>
  <div id="custom-calendar">
    <Calendar
      ref="calendar"
      @date="handleDateChange($event)"
      :format="'YYYY-MM-DD'"
      :weekText="['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']"
      sundayBegin
      disabledFutureDay
      :markers="markers"
      hideOtherMonthMarker
      hideOtherMonthDay
      hideMarker
    />
  </div>
</template>

<script>
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;

export default {
  name: "HideMarker",
  data() {
    return {
      markers: [
        {
          date: `${year}-${month}-1`,
          className: "dream",
        },
        {
          date: `${year}-${month}-20`,
          className: "love",
        },
        {
          date: `${year}-${month}-30`,
          className: "miss",
        },
        {
          date: `${year}-${month + 1}-1`,
          className: "hope",
        },
      ],
    };
  },
  created() {
    setTimeout(() => {
      this.markers.push({
        date: `${year}-${month}-14`,
        className: "like",
      });
    }, 3000);
  },
  methods: {
    handleDateChange(obj) {
      console.log(JSON.stringify(obj));
    },
  },
};
</script>

<style scoped>
#custom-calendar >>> .calendar-header {
  background-color: #5300e8;
}

/* marker style*/
#custom-calendar >>> .love span {
  color: #fff;
  background-color: #7b1fa2;
}

#custom-calendar >>> .miss span {
  color: #fff;
  background-color: #ff4081;
}

#custom-calendar >>> .dream span {
  color: #fff;
  background-color: #448aff;
}

#custom-calendar >>> .hope span {
  color: #fff;
  background-color: #ff5722;
}

#custom-calendar >>> .like span {
  color: #fff;
  background-color: #ff4081;
}

#custom-calendar >>> .weekend-day span {
  color: #536dfe;
}
</style>