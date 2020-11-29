<template>
  <section>
    <div class="custom-calendar-header">
      <h3>props.sundayBegin</h3>
      <input type="checkbox" v-model="sundayBegin" />
    </div>
    <Calendar :sundayBegin="sundayBegin" />
  </section>
</template>

<script>
export default {
  name: "SundayBegin",
  data() {
    return {
      sundayBegin: false,
    };
  },
};
</script>

