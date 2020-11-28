<template>
  <section id="custom-calendar">
    <div class="custom-calendar-header">
      <h3>props.hideOtherMonthMarker</h3>
      <input type="checkbox" v-model="hideOtherMonthMarker" />
    </div>
    <Calendar :markers="markers" :hideOtherMonthMarker="hideOtherMonthMarker" />
  </section>
</template>

<script>
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;

export default {
  name: "HideOtherMonthMarker",
  data() {
    return {
      hideOtherMonthMarker: false,
      markers: [
        {
          date: `${year}/${month}/1`,
          className: "dream",
        },
        {
          date: `${year}/${month}/20`,
          className: "love",
        },
        {
          date: `${year}/${month}/30`,
          className: "miss",
        },
        {
          date: `${year}-${month + 1}/1`,
          className: "hope",
        },
      ],
    };
  },
};
</script>
