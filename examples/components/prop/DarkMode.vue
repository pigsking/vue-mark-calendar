<template>
  <section id="custom-calendar">
    <div class="custom-calendar-header">
      <h3>
        <a
          target="blank"
          href="https://github.com/pigsking/vue-mark-calendar/blob/master/examples/components/prop/DarkMode.vue"
          >darkMode</a
        >
      </h3>
      <input type="checkbox" v-model="darkMode" />
    </div>
    <Calendar :darkMode="darkMode" />
  </section>
</template>

<script>
export default {
  name: "DarkMode",
  data() {
    return {
      darkMode: true,
    };
  },
};
</script>