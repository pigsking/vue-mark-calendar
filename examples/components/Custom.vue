<template>
  <section>
    <h2>CUSTOM</h2>

    <WeekendDay />

    <Format />

    <WeekText />

    <SundayBegin />

    <DisabledFutureDay />

    <Markers />

    <HideOtherMonthMarker />

    <HideMarker />
    
    <HideOtherMonthDay />
    
    <TodayText/>
    
    <DisabledSwitchMonth/>

    <MultiDayMarkers/>
    
    <HideArrows/>
  </section>
</template>
<script>
import {
  Format,
  WeekendDay,
  WeekText,
  SundayBegin,
  DisabledFutureDay,
  Markers,
  HideOtherMonthMarker,
  HideOtherMonthDay,
  HideMarker,
  TodayText,
  DisabledSwitchMonth,
  MultiDayMarkers,
  HideArrows
} from "./customs";
export default {
  name: "Custom",
  components: {
    Format,
    WeekendDay,
    WeekText,
    SundayBegin,
    DisabledFutureDay,
    Markers,
    HideOtherMonthMarker,
    HideOtherMonthDay,
    HideMarker,
    TodayText,
    DisabledSwitchMonth,
    MultiDayMarkers,
    HideArrows
  },
};
</script>
<style scoped>
.custom-calendar-header{
 display: flex;
}
#custom-calendar >>> .choose-day span {
  color: #fff !important;
}

/* 
#custom-calendar >>> .calendar-header {
  background-color: #5300e8;
} */

/* marker style*/
/* #custom-calendar >>> .love span {
  color: #fff !important;
  background-color: #7b1fa2;
}

#custom-calendar >>> .miss span {
  color: #fff !important;
  background-color: #ff4081;
}

#custom-calendar >>> .dream span {
  color: #fff !important;
  background-color: #448aff;
}

#custom-calendar >>> .hope span {
  color: #fff !important;
  background-color: #ff5722;
} */
</style>