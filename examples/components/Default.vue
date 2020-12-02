<template>
  <section>
    <h2><a target="blank" href="https://github.com/pigsking/vue-mark-calendar/blob/master/examples/components/Default.vue" >DEFAULT</a></h2>
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

