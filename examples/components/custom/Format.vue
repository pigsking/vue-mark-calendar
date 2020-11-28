<template>
  <div id="custom-calendar">
    <Calendar
      ref="calendar"
      @date="handleDateChange($event)"
      :format="'YYYY-MM-DD'"
    />
  </div>
</template>

<script>
export default {
  name: "Format",

  methods: {
    handleDateChange(obj) {
      console.log(JSON.stringify(obj));
    },
  },
};
</script>
