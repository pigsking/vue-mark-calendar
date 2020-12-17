<template>
  <section>
    <h3>
      <a
        target="blank"
        href="https://github.com/pigsking/vue-mark-calendar/blob/master/examples/components/method/PrevMonth.vue"
        >prevMonth</a
      >
      <button @click="prevMonth">上一月</button>
    </h3>
    <Calendar ref="calendar" />
  </section>
</template>
<script>
export default {
  name: "PrevMonth",
  methods: {
    prevMonth() {
      this.$refs.calendar.prevMonth();
    },
  },
};
</script>