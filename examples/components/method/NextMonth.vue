<template>
  <section>
    <h3>
      <a
        target="blank"
        href="https://github.com/pigsking/vue-mark-calendar/blob/master/examples/components/method/NextMonth.vue"
        >nextMonth</a
      >
      <button @click="nextMonth">下一月</button>
    </h3>
    <Calendar ref="calendar" />
  </section>
</template>
<script>
export default {
  name: "NextMonth",
  methods: {
    nextMonth() {
      this.$refs.calendar.nextMonth();
    },
  },
};
</script>