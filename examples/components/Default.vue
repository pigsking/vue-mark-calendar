<template>
  <section>
    <h2>DEFAULT</h2>
    <Calendar ref="calendar" @date="handleDateChange($event)" todayText/>
  </section>
</template>

<script>
export default {
  name: "DefaultCalendar",
  methods: {
    handleDateChange(obj) {
      console.log(JSON.stringify(obj));
    },
  },
};
</script>

