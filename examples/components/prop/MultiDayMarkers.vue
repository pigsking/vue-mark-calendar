<template>
  <section>
    <div class="custom-calendar-header">
      <h3>
        <a
          target="blank"
          href="https://github.com/pigsking/vue-mark-calendar/blob/master/examples/components/prop/HideOtherMonthMarker.vue"
          >multiDayMarkers</a
        >
      </h3>
    </div>
    <Calendar :multiDayMarkers="markers" />
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
          endDate: `${year}/${month}/15`,
          className: "dream",
        },
      ],
    };
  },
};
</script>
<style scoped>
section :deep() .dream {
  color: #fff !important;
  background-color: #2680eb;
}

section :deep() .index-module_header_2gnmJ {
  background-color: lightblue !important;
}
</style>
