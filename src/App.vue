<template>
  <div id="app">
    <div id="calendar-wrap">
      <Calendar
        ref="calendar"
        format="YYYY-MM-DD"
        :markers="props.markers"
        @date="handleDateChange($event)"
      ></Calendar>
    </div>
    <div class="copyright">Copyright © {{new Date().getFullYear()}} Allen AuYeung</div>
  </div>
</template>

<script>
import Calendar from "./components/Calendar";

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;

export default {
  name: "app",
  components: {
    Calendar
  },
  data() {
    return {
      props: {
        weekText: ["日", "一", "二", "三", "四", "五", "六"],
        markers: [
          {
            date: `${year}-${month}-3`,
            className: "dream"
          },
          {
            date: `${year}-${month}-20`,
            className: "love"
          },
          {
            date: `${year}-${month}-30`,
            className: "miss"
          },
          {
            date: `${year}-${month + 1}-1`,
            className: "hope"
          }
        ]
      }
    };
  },
  methods: {
    handleDateChange(obj) {
      // console.log(JSON.stringify(obj));
    }
  }
};
</script>

<style>
body {
  background-color: #efefef;
}
#calendar-wrap {
  padding-bottom: 30px;
  color: #2c3e50;
}
/* marker */
#calendar-wrap {
  max-width: 414px;
  margin: auto;
}
/* marker style*/
#calendar-wrap /deep/ .love span {
  color: #fff;
  background-color: #7b1fa2;
}
#calendar-wrap /deep/ .miss span {
  color: #fff;
  background-color: #ff4081;
}

#calendar-wrap /deep/ .dream span {
  color: #fff;
  background-color: #448aff;
}

#calendar-wrap /deep/ .hope span {
  color: #fff;
  background-color: #ff5722;
}

#calendar-wrap /deep/ .weekend-day span {
  color: #536dfe;
}

/* copyright */
.copyright {
  padding: 30px 0;
  text-align: center;
  color: #ccc;
  font-size: 12px;
}
</style>
