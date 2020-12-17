<template>
  <section>
    <h3>
      <a
        target="blank"
        href="https://github.com/pigsking/vue-mark-calendar/blob/master/examples/components/event/Date.vue"
        >date</a
      >

      <span>你选中了{{ date }}</span>
    </h3>
    <Calendar @date="handleDayChoose" />
  </section>
</template>
<script>
export default {
  name: "Date",
  data() {
    return {
      date: "",
    };
  },
  methods: {
    handleDayChoose(dateObj) {
      this.date = dateObj.date;
    },
  },
};
</script>