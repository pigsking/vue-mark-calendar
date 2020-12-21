<template>
  <section>
    <div class="custom-calendar-header">
      <h3><a target="blank" href="https://github.com/pigsking/vue-mark-calendar/blob/master/examples/components/prop/Markers.vue" >markers</a></h3>
      <button @click="randomMarker">Random</button>
    </div>
    <Calendar :markers="markers" />
  </section>
</template>



<script>
export default {
  name: "Markers",
  data() {
    return {
      markers: [],
    };
  },
  created() {
    this.randomMarker();
  },
  methods: {
    randomMarker() {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const classes = ["dream", "love", "miss", "hope"];

      this.markers = classes.map((className) => {
        const day = this.getRandomIntInclusive(1, 28);
        return {
          date: `${year}/${month}/${day}`,
          className: className,
        };
      });
    },
    getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
  },
};
</script>
<style scoped>
section :deep() .love span {
  color: #fff !important;
  background-color: #7b1fa2;
}

section :deep() .miss span {
  color: #fff !important;
  background-color: #ff4081;
}

section :deep() .dream span {
  color: #fff !important;
  background-color: #448aff;
}

section :deep() .hope span {
  color: #fff !important;
  background-color: #ff5722;
}
</style>