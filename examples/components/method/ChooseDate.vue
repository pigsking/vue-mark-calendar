<template>
  <section>
    <h3>
      <a
        target="blank"
        href="https://github.com/pigsking/vue-mark-calendar/blob/master/examples/components/method/ChooseDate.vue"
        >chooseDate</a
      >
      <button @click="chooseDate('2020/12/25')">2020/12/25</button>
      <button @click="backToToday">回到今天</button>
    </h3>
    <Calendar ref="calendar" />
  </section>
</template>
<script>
export default {
  name: "ChooseDate",
  methods: {
    chooseDate(date) {
      this.$refs.calendar.chooseDate(date);
    },
    backToToday(){
      this.$refs.calendar.chooseDate();
    }
  },
};
</script>