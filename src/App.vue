<template>
  <div id="app">
    <div id="calendar-wrap">
      <Calendar
        ref="calendar"
        :weekText="props.weekText.selected"
        :format="props.format.selected"
        :markers="props.markers"
        :disabledFutureDay="props.disabledFutureDay"
        :hideOtherMonthDay="props.hideOtherMonthDay"
        :hideOtherMonthMarker="props.hideOtherMonthMarker"
        @month="handleDateChange($event)"
        @day="handleDateChange($event)"
      ></Calendar>
      <div class="calendar-footer">
        <span>You chooesed</span>
        <h2 style="text-align:center;">{{currentDate}}</h2>
      </div>
    </div>
    <div class="control">
      <section>
        <h3>Props</h3>
        <div class="table">
          <ul class="table-header">
            <li>name</li>
            <li>type</li>
            <li>default</li>
            <li>description</li>
            <li>change</li>
          </ul>
          <div class="table-body">
            <ul>
              <li>disabledFutureDay</li>
              <li>Boolean</li>
              <li>false</li>
              <li>Disabled the future days</li>
              <li>
                <input type="checkbox" id="disabledFutureDay" v-model="props.disabledFutureDay">
              </li>
            </ul>
            <ul>
              <li>hideOtherMonthDay</li>
              <li>Boolean</li>
              <li>false</li>
              <li>Hide the other month days</li>
              <li>
                <input type="checkbox" id="hideOtherMonthDay" v-model="props.hideOtherMonthDay">
              </li>
            </ul>
            <ul>
              <li>hideOtherMonthMarker</li>
              <li>Boolean</li>
              <li>true</li>
              <li>Hide the other months marker</li>
              <li>
                <input type="checkbox" id="hideOtherMonthDay" v-model="props.hideOtherMonthMarker">
              </li>
            </ul>
            <ul>
              <li>format</li>
              <li>String</li>
              <li>'YYYY-MM-DD'</li>
              <li>Format the date</li>
              <li>
                <select name id v-model="props.format.selected">
                  <option v-for="(item,index) in props.format.options" :key="index">{{item}}</option>
                </select>
              </li>
            </ul>
            <ul>
              <li>weekText</li>
              <li>Array</li>
              <li>["S", "M", "T", "W", "T", "F", "S"]</li>
              <li>Set the week text</li>
              <li>
                <select name id v-model="props.weekText.lang">
                  <option v-for="(item,index) in props.weekText.options" :key="index">{{item.lang}}</option>
                </select>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
    <div class="copyright">Copyright © 2019 Allen AuYeung</div>
  </div>
</template>

<script>
import Calendar from "./components/Calendar.vue";

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
        disabledFutureDay: false,
        hideOtherMonthDay: false,
        hideOtherMonthMarker: true,
        format: {
          selected: "YYYY-MM-DD",
          options: ["YYYY-MM-DD", "YYYY-M-D", "YY/MM/DD", "YY/M/D"]
        },
        weekText: {
          lang: "EN",
          selected: "",
          options: [
            {
              lang: "EN",
              value: ["S", "M", "T", "W", "T", "F", "S"]
            },
            {
              lang: "ZH",
              value: ["日", "一", "二", "三", "四", "五", "六"]
            }
          ]
        },
        markers: [
          {
            date: `${year}-${month}-09`,
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
            date: `${year}-${month + 1}-01`,
            className: "hope"
          }
        ]
      },
      currentDate: "",
      targetDate: ""
    };
  },
  watch: {
    currentDate(newVal, oldVal) {
      this.targetDate = oldVal;
    },
    "props.format.selected"() {
      this.$refs.calendar.chooseTargetDate(this.currentDate);
    },
    "props.weekText.lang"(val) {
      this.setWeekText(val);
    }
  },
  created() {
    this.setWeekText();
  },
  methods: {
    handleDateChange(date) {
      this.currentDate = date;
    },
    setWeekText(lang = "EN") {
      this.props.weekText.options.filter(item => {
        if (item.lang === lang) {
          this.props.weekText.selected = item.value;
        }
      });
    },
    // handleDateChange(date) {
    //   this.currentDate = date;
    // },
    // switchToPrevMonth() {
    //   this.$refs.calendar.switchToPrevMonth();
    // },
    // switchToNextMonth() {
    //   this.$refs.calendar.switchToNextMonth();
    // },
    chooseTargetDate() {
      this.$refs.calendar.chooseTargetDate(this.targetDate);
    }
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}
ul {
  padding-left: 0;
}
li {
  list-style: none;
}
body,
select {
  /* background-color: #efefef; */
}
#app {
  /* max-width: 1080px; */
  margin: auto;
}
h1,
h2,
h3 {
  margin: 0;
}
/* calendar */
#calendar-wrap {
  padding-bottom: 30px;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #232323;
}
/* marker */
#calendar-wrap /deep/ #calendar {
  max-width: 414px;
  margin: auto;
}
/* marker style*/
#calendar-wrap/deep/ .love span {
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

#calendar-wrap .calendar-footer {
  margin-top: 30px;
  color: #ccc;
}
#calendar-wrap .calendar-footer h2 {
  margin-top: 10px;
}
/* control */
.control-header span {
  line-height: 40px;
  font-size: 14px;
}
.control {
  padding: 30px 60px;
  background-color: #fff;
}
/* .control-header {
  text-align: center;
}*/
.control h3 {
  margin: 30px 0;
}
.control ul {
  padding: 10px;
}
.control li {
  margin-bottom: 10px;
}
.current-date {
  text-align: center;
  color: #232323;
}
/* table */
.table {
  border: 1px solid #efefef;
}
.table ul {
  display: flex;
  padding: 0;
  align-items: center;
}
.table li {
  width: 24%;
  text-align: center;
}
.table .table-body ul {
  height: 60px;
  margin: 0;
  border-top: 1px solid #efefef;
}
/* copyright */
.copyright {
  padding: 30px 0;
  text-align: center;
  color: #ccc;
  font-size: 12px;
}
</style>
