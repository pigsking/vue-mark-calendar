<template>
  <section id="custom-calendar">
    <div class="custom-calendar-header">
      <h3>props.markers</h3>
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
