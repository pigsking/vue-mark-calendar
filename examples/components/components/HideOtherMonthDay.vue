<template>
  <section id="custom-calendar">
    <div class="custom-calendar-header">
      <h3>props.hideOtherMonthDay</h3>
      <input type="checkbox" v-model="hideOtherMonthDay" />
    </div>
    <Calendar :hideOtherMonthDay="hideOtherMonthDay" />
  </section>
</template>

<script>
export default {
  name: "HideMarker",
  data() {
    return {
      hideOtherMonthDay: false,
    };
  },
};
</script>
