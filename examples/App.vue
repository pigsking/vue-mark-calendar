<template>
  <div id="calendar-wrap">
    <div class="item">
      <h3>DEFAULT</h3>
      <DefaultCalendar />
    </div>
    <div class="item">
      <h3>CUSTOM</h3>
      <CustomCalendar />
    </div>
    <div class="copyright">© {{ new Date().getFullYear() }} Allen AuYeung</div>
  </div>
</template>

<script>
import DefaultCalendar from "./components/DefaultCalendar";
import CustomCalendar from "./components/CustomCalendar";

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;

export default {
  components: {
    DefaultCalendar,
    CustomCalendar,
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
