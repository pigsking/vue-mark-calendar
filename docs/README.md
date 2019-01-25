---
home: true
footer: MIT Licensed
---
<template>
  <div id="calendar-wrap">
   <iMarker :markers="props.markers"/>
  </div>
</template>

<script>
import iMarker from 'imarker'
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
export default {
  components:{
     iMarker
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
  padding-bottom: 30px;
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
<iMarker :weekText="['日','一', '二', '三', '四', '五', '六']"></iMarker>
```
### format
* Type: `String`
* Default: "YYYY-MM-DD"
* Usage: Set date format
* Example:
```html
<iMarker format="YY/MM/DD"></iMarker>
```

### sundayBegin
* Type: `Boolean`
* Default: `true`
* Usage: Sunday is the beginning or end of the week
* Example:
```html
<iMarker :sundayBegin="false"></iMarker>
```

### disabledFutureDay
* Type: `Boolean`
* Default: `false`，
* Usage：Events after today do not trigger events
* Example:
```html
<iMarker :disabledFutureDay="true"></iMarker>
```

### hideOtherMonthDay
* Type: `Boolean`
* Default: `false`
* Usage：Show only the days of the current month
* Example:
```html
<iMarker :hideOtherMonthDay="true"></iMarker>
```


### hideOtherMonthMarker
* Type: `Boolean`
* Default: `true`
* Usage：Show only the markers of the current month
* Example:
```html
<iMarker :hideOtherMonthMarker="true"></iMarker>
```

### markers
* Type: `Array`
* Default: `undefined`
* Example:
```html
<template>
  <iMarker :markers="markers"></iMarker>
</template>
<script>
import iMarker from 'imarker'
export default {
  components:{
    iMarker
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
```
# Methods&Events
### $ref.switchToPrevMonth
* Usage: Switch to the previous month. When the month change that the component will emit an event(month).
* Example:
```html
<template>
  <iMarker ref="calendar" @month="handleMonthChange($event)"></iMarker>
</template>
<script>
import iMarker from 'imarker'
export default {
    components:{
      iMarker
    },
    created(){
        this.$refs.calendar.switchToPrevMonth();
    },
    methods:{
      handleMonthChange(date){
        console.log(date) // 2019-09-14
      }
    }   
}
</script>
```

### $ref.switchToNextMonth
* Usage: Switch to the next month. When the month change that the component will emit an event(month).
* Example:
```html
<template>
  <iMarker ref="calendar" @month="handleMonthChange($event)"></iMarker>
</template>
<script>
import iMarker from 'imarker'
export default {
    components:{
      iMarker
    },
    created(){
        this.$refs.calendar.switchToNextMonth();
    },
    methods:{
      handleMonthChange(date){
        console.log(date) // 2019-09-14
      }
    }     
}
</script>
```

### $ref.chooseTargetDate
* Usage: Choose the target date. When the day change that the component will emit an event(day)
* Example:
```html
<template>
  <iMarker ref="calendar" @day="handleDayChange($event)"></iMarker>
</template>
<script>
import iMarker from 'imarker'
export default {
    components:{
      iMarker
    },
    created(){
        this.$refs.calendar.chooseTargetDate('2019-09-14');
    },
    methods(){
      handleDayChange(date){
        console.log(date) // 2019-09-14
      }
    }   
}
</script>
```

