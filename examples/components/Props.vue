<template>
  <section>
    <h2>Props</h2>
    <WeekendDay />
    
    <Format />

    <WeekText />

    <SundayBegin />

    <DisabledFutureDay />

    <Markers />

    <HideOtherMonthMarker />

    <HideMarker />

    <HideOtherMonthDay />

    <TodayText />

    <DisabledSwitchMonth />

    <MultiDayMarkers />

    <HideArrows />
    
    <DarkMode/>
  </section>
</template>
<script>
import components from "./prop";
export default {
  components: components,
};
</script>
<style scoped>
.custom-calendar-header {
  display: flex;
}
#custom-calendar :deep() .choose-day span {
  color: #fff !important;
}
</style>