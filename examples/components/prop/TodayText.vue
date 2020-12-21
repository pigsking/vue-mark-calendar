<template>
  <section>
    <h3><a target="blank" href="https://github.com/pigsking/vue-mark-calendar/blob/master/examples/components/prop/TodayText.vue" >todayText</a></h3>
    <Calendar todayText="今" />
  </section>
</template>
<style scoped>
section :deep() .today span{
 color: #fff;
 background-color: #f78fb3;
}
</style>