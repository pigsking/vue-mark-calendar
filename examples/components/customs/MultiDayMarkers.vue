<template>
  <section>
    <div class="custom-calendar-header">
      <h3><a target="blank" href="https://github.com/pigsking/vue-mark-calendar/blob/master/examples/components/customs/HideOtherMonthMarker.vue" >props.multiDayMarkers</a></h3>
    </div>
    <Calendar :multiDayMarkers="markers"/>
  </section>
</template>

<script>
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;

export default {
  name: "MultiDayMarkers",
  data() {
    return {
      markers: [
        {
          startDate: `${year}/${month}/1`,
          endDate:`${year}/${month}/15`,
          className: "dream",
        },
      ],
    };
  },
};
</script>
<style scoped>
section >>> .dream {
  color: #fff !important;
  background-color: #448aff;
}
</style>
