---
home: true
heroText: iMarker
footer: MIT Licensed
---
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
    <Calendar :markers="markers"></Calendar>
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
<Calendar ref="calendar"></Calendar>
export default {
    created(){
        this.$refs.calendar.chooseTargetDate('2019-09-14');
    }   
}
```

