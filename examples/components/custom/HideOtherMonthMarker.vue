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
    />
  </div>
</template>

<script>
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;

export default {
  name: "HideOtherMonthMarker",
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

<style scoped src="./index.css"></style>
