---
home: true
footer: MIT Licensed
---

<template>
  <div id="calendar-wrap">
   <iMarker  :markers="props.markers"/>
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
  padding-bottom: 30px;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* background-color: #232323; */
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

</style>


# props
### weekText
* Type: `Array`
* Default: EN->["S", "M", "T", "W", "T", "F", "S"]

### format
* Type: `String`
* Default: "YYYY-MM-DD"
* Usage: 设置返回日期的格式，同时支持 **'YYYY-M-D'**、**'YY/MM/DD'**、**'YY/M/D'** 格式


### sundayBegin
* Type: `Boolean`
* Default: "true"
* Usage: 设置一周的第一天是否为星期天

### disabledFutureDay
* Type: `Boolean`
* Default: "false"，
* Usage：未来的日期不触发事件

### hideOtherMonthDay
* Type: `Boolean`
* Default: "false"
* Usage：只显示当前月份的天数

### hideOtherMonthMarker
* Type: `Boolean`
* Default: "true"
* Usage：只显示当前月份的标记

### markers
* Type: `Array`
* Default: "[]",
* Usage：为指定的日子设置标记类
* Example:
```html
<div id="calendar-wrap">
    <imarker :markers="markers"></imarker>
</div>
<script>
    export default {
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
#calendar-wrap /deep/ .dream span {
  color: #fff;
  background-color: #448aff;
}
</style>
```
# event
### $ref.switchToPrevMonth
* Usage: 跳转至上一个月

### $ref.switchToNextMonth
* Usage: 跳转至下一个月

### $ref.chooseTargetDate
* Usage: 跳转至指定日期
* Example:
```javascript
<imarker ref="calendar"></imarker>
export default {
    created(){
        this.$refs.calendar.chooseTargetDate('2019-09-14');
    }   
}
```

