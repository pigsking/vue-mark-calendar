<template>
  <div id="calendar-wrap">
    <div class="item">
      <h2>DEFAULT</h2>
      <Default />
    </div>
    <div class="item">
      <h2>CUSTOM</h2>
      <section>
        <h3>Format</h3>
        <Format />
      </section>
      <section>
        <h3>WeekText</h3>
        <WeekText />
      </section>
      <section>
        <h3>Sunday Begin</h3>
        <SundayBegin />
      </section>
      <section>
        <h3>Disabled Future Day</h3>
        <DisabledFutureDay />
      </section>
      <section>
        <h3>Markers</h3>
        <Markers />
      </section>
      <section>
        <h3>Hide Other Month Marker</h3>
        <HideOtherMonthMarker />
      </section>
      <section>
        <h3>Hide Other Month Day</h3>
        <HideOtherMonthDay />
      </section>
      <section>
        <h3>Hide Marker</h3>
        <HideMarker />
      </section>
    </div>
    <div class="copyright">© {{ new Date().getFullYear() }} Allen AuYeung</div>
  </div>
</template>

<script>
import Default from "./components/Default";
import {
  Format,
  WeekText,
  SundayBegin,
  DisabledFutureDay,
  Markers,
  HideOtherMonthMarker,
  HideOtherMonthDay,
  HideMarker,
} from "./components/custom";

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;

export default {
  components: {
    Default,
    Format,
    WeekText,
    SundayBegin,
    DisabledFutureDay,
    Markers,
    HideOtherMonthMarker,
    HideOtherMonthDay,
    HideMarker,
  },
  data() {
    return {
      props: {
        format: "YYYY-MM-DD",
        weekText: ["日", "一", "二", "三", "四", "五", "六"],
        sundayBegin: false,
        disabledFutureDay: false,
        hideOtherMonthDay: false,
        hideOtherMonthMarker: false,
        markers: [
          {
            date: `${year}-${month}-1`,
            className: "dream",
          },
          {
            date: `${year}-${month}-20`,
            className: "love",
          },
          {
            date: `${year}-${month}-30`,
            className: "miss",
          },
          {
            date: `${year}-${month + 1}-1`,
            className: "hope",
          },
        ],
      },
    };
  },
};
</script>

<style scoped>
#calendar-wrap {
  max-width: 414px;
  margin: auto;
}

/* copyright */
.copyright {
  padding: 30px 0;
  text-align: center;
  color: #ccc;
  font-size: 12px;
  background-color: #efefef;
}
</style>
