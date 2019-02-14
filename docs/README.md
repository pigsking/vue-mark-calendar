---
home: true
footer: MIT Licensed
---
<template>
  <div id="calendar-wrap">
   <Calendar :markers="props.markers"/>
  </div>
</template>

<script>
import Calendar from 'imarker'
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
export default {
  components:{
     Calendar
  },
  data () {
    return {
      props: {
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
      }
    };
  }
}
</script>
<style>
/* calendar */
#calendar-wrap {
  max-width: 414px;
  margin: auto;
  /* padding-bottom: 30px; */
  text-align: center;
  border:1px solid #f3f4f5;
}
/* marker */
/* marker style*/
#calendar-wrap /deep/ .month-switch{
  border-bottom:1px solid #f3f4f5;
  color:#232323;
  background-color:#fff;
}
#calendar-wrap /deep/ .month-switch .prev,
#calendar-wrap /deep/ .month-switch .next{
  border-color:#ccc;
}
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

</style>


# Props
### weekText
* Type: `Array`
* Default: EN->["S", "M", "T", "W", "T", "F", "S"]
* Example:
```html
<Calendar :weekText="['日','一', '二', '三', '四', '五', '六']"></Calendar>
```
### sundayBegin
* Type: `Boolean`
* Default: `true`
* Usage: Sunday is the beginning or end of the week
* Example:
```html
<Calendar :sundayBegin="false"></Calendar>
```
* Note: 当值为 true 时，若 week text 不是默认的应当调整

### format
* Type: `String`
* Default: "YYYY-MM-DD"
* Usage: Set date format. Support 'YYYY-MM-DD' and "YYYY/M/D"
* Example:
```html
<Calendar format="YYYY/M/D"></Calendar>
```

### disabledFutureDay
* Type: `Boolean`
* Default: `false`，
* Usage：Events after today do not trigger events
* Example:
```html
<Calendar :disabledFutureDay="true"></Calendar>
```

### hideOtherMonthDay
* Type: `Boolean`
* Default: `false`
* Usage：Show only the days of the current month
* Example:
```html
<Calendar :hideOtherMonthDay="true"></Calendar>
```


### hideOtherMonthMarker
* Type: `Boolean`
* Default: `true`
* Usage：Show only the markers of the current month
* Example:
```html
<Calendar :hideOtherMonthMarker="true"></Calendar>
```

### markers
* Type: `Array`
* Default: `undefined`
* Example:
```html
<template>
  <Calendar :markers="markers"></Calendar>
</template>
<script>
import Calendar from 'imarker'
export default {
  components:{
    Calendar
  },
  data(){
    return{
        markers: [
          {
            date: '2019-09-14',
            className: "dream"
          }
        ]
    }
  }
}
</script>
<style>
// custom marker style
#calendar-wrap /deep/ .dream span {
  color: #fff;
  background-color: #448aff;
}
</style>
* Note: markers 的 日期格式应与 format 保持一致，否则无法达到效果

```
# Methods&Events

### $ref.chooseTargetDate
* Usage: Choose the target date. When the day change that the component will emit an event(day)
* Example:
```html
<template>
  <Calendar ref="calendar" @day="handleDayChange($event)"></Calendar>
</template>
<script>
import Calendar from 'imarker'
export default {
    components:{
      Calendar
    },
    created(){
        this.$refs.calendar.chooseTargetDate('2019-09-14');
    },
    methods(){
      handleDayChange(dateObj){
        console.log(date) // {"day":14,"date":"2019-09-14","week":6,"isFutureDay":true}
      }
    }   
}
</script>
```
* Note: markers 的 日期格式应与 format 保持一致，否则无法达到效果

### $ref.formatDate
* Usage: Choose the target date. When the day change that the component will emit an event(day)
* Example:
```html
<template>
  <Calendar ref="calendar"></Calendar>
</template>
<script>
import Calendar from 'imarker'
export default {
    components:{
      Calendar
    },
    created(){
        this.$refs.calendar.formatDate('2019-09-09','YYYY/M/D'); // 2019/9/9
    }
}
</script>
```