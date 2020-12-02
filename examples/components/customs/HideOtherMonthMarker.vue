<template>
  <section>
    <div class="custom-calendar-header">
      <h3><a target="blank" href="https://github.com/pigsking/vue-mark-calendar/blob/master/examples/components/customs/HideOtherMonthMarker.vue" >props.hideOtherMonthMarker</a></h3>
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
          date: `${month===12?year+1:year}/${month===12?1:month+ 1}/1`,
          className: "hope",
        },
      ],
    };
  },
};
</script>
<style scoped>
section >>> .love span {
  color: #fff !important;
  background-color: #7b1fa2;
}

section >>> .miss span {
  color: #fff !important;
  background-color: #ff4081;
}

section >>> .dream span {
  color: #fff !important;
  background-color: #448aff;
}

section >>> .hope span {
  color: #fff !important;
  background-color: #ff5722;
}
</style>
