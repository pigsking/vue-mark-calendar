<template>
  <section id="custom-calendar">
    <div class="custom-calendar-header">
      <h3><a target="blank" href="https://github.com/pigsking/vue-mark-calendar/blob/master/examples/components/prop/HideOtherMonthDay.vue" >hideOtherMonthDay</a></h3>
      <input type="checkbox" v-model="hideOtherMonthDay" />
    </div>
    <Calendar :hideOtherMonthDay="hideOtherMonthDay" />
  </section>
</template>

<script>
export default {
  name: "HideOtherMonthDay",
  data() {
    return {
      hideOtherMonthDay: true,
    };
  },
};
</script>
