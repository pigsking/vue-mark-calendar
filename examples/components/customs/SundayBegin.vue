<template>
  <section>
    <div class="custom-calendar-header">
       <h3><a target="blank" href="https://github.com/pigsking/vue-mark-calendar/blob/master/examples/components/customs/SundayBegin.vue" >props.sundayBegin</a></h3>
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

