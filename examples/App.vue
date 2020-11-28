<template>
  <div id="calendar-wrap">
    <div class="item">
      <h2>DEFAULT</h2>
      <Default />
    </div>
    <div class="item">
      <h2>CUSTOM</h2>
      <section>
        <h3>Weekend Day</h3>
        <WeekendDay />
      </section>
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
  WeekendDay,
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
    WeekendDay,
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
#custom-calendar >>> .choose-day span {
  color: #fff !important;
}
#custom-calendar >>> .weekend-day span {
  color: #536dfe;
}

#custom-calendar >>> .calendar-header {
  background-color: #5300e8;
}

/* marker style*/
#custom-calendar >>> .love span {
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
