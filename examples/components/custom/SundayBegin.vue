<template>
  <div id="custom-calendar">
    <Calendar
      ref="calendar"
      @date="handleDateChange($event)"
      :format="'YYYY-MM-DD'"
      :weekText="['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']"
      sundayBegin
    />
  </div>
</template>

<script>
export default {
  name: "SundayBegin",

  methods: {
    handleDateChange(obj) {
      console.log(JSON.stringify(obj));
    },
  },
};
</script>
