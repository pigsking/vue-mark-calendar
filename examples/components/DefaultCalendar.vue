<template>
  <Calendar ref="calendar" @date="handleDateChange($event)" />
</template>

<script>
export default {
  name: "DefaultCalendar",
  methods: {
    handleDateChange(obj) {
      console.log(JSON.stringify(obj));
    }
  },
};
</script>

