# vue-mark-calendar
一个基于 Vue 2.x 开发的日历标记组件，版本记录请在[更新日志]中查看。

## :interrobang: Important
- [imarker] 已不再维护, 请使用 [vue-mark-calendar]

## :package: Install
```
npm install @pigsking/vue-mark-calendar
//or
yarn add @pigsking/vue-mark-calendar
```
## :grey_question: Usage
```javscript
// main.js
import Vue from 'vue'
import Calendar from '@pigsking/vue-mark-calendar'

Vue.use(Calendar)
```
## :open_book: API
具体使用方法请查看具体[相关示例]
### Props

**markers**
- Type: `Array`
- Usage: 
```javascript
<Calendar :markers="markers" />
export default{
    data(){
        return{
             markers: [
                {
                    date: "2020/12/20",
                    className: "dream",
                },
            ],
        }
    }
}
```
需要标记的天数

**multiDayMarkers**
- Type: `Boolean`
- Default: `false`
- Usage: 
```javascript
<Calendar :multiDayMarkers="multiDayMarkers" />
export default{
    data(){
        return{
             multiDayMarkers: [
                {
                    startDate: "2020/11/10",
                    endDate: "2020/11/20",
                    className: "dream",
                },
             ]
        }
    }
}
```
 一次标记多天

**sundayBegin**
- Type: `Boolean`
- Default: `false`
- Usage: 
```javascript
<Calendar sundayBegin />
```
 设置一周的开始为星期天

**hideOtherMonthDay**
- Type: `Boolean`
- Default: `false`
- Usage: 
```javascript
<Calendar hideOtherMonthDay />
```
 隐藏其它月份的天数
 
**hideOtherMonthMarker**
- Type: `Boolean`
- Default: `false`
- Usage: 
```javascript
<Calendar hideOtherMonthMarker />
```
 隐藏其它月份的标记

 
**disabledFutureDay**
- Type: `Boolean`
- Default: `false`
- Usage: 
```javascript
<Calendar disabledFutureDay />
```
 设置未来的天数不可点击

 
**format**
- Type: `String`
- Default: "YYYY/MM/DD"
- Usage: 
```javascript
<Calendar format="YYYY-MM-DD" />
```
 日期格式化形式,目前只支持 "YYYY/MM/DD"、"YYYY/M/D"、"YYYY-MM-DD"、"YYYY-M-D"
 
**weekText**
- Type: `Array`
- Default: `["一", "二", "三", "四", "五", "六", "日"]`
- Usage: 
```javascript
<Calendar :weekText="['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']" />
```
 周几的文字描述
 
**hideMarker**
- Type: `Boolean`
- Usage: 
```javascript
<Calendar hideMarker />
```
 隐藏所有的标记
 
**todayText**
- Type: `String`
- Usage: 
```javascript
<Calendar todayText="今" />
```
 周几的文字描述

**disabledSwitchMonth**
- Type: `Boolean`
- Default: `false`
- Usage: 
```javascript
<Calendar disabledSwitchMonth />
```
 禁用月份切换

### Methods

**chooseDate()**

- Arguments: `{String} date string`
- Usage:
```javascript
<Calendar ref="calendar" />
export default{
   mounted(){
       // 回到今天
       this.$refs.calendar.chooseDate()

       // 选中指定日期
       this.$refs.calendar.chooseDate('2020/12/20')
   }
}
```
选中某天，传参数时选中所传日期，不传参数时选中当天

**getDateObj()**

- Arguments: `{String} date string`
- Usage:
```javascript
<Calendar ref="calendar" />
export default{
   mounted(){
       // 获取今天对象
      const todayInfo = this.$refs.calendar.getDateObj()

       // 选中指定日期对象
      const dayInfo = this.$refs.calendar.getDateObj('2020/12/20')
   }
}
```
获取日期对象，传参数时选中所传日期的对象，不传参数时获取当天日期对象

### Events

**date**
- Usage:
```javascript
<Calendar @date="handleChooseDay($event)" />
export default{
   methods(){
       handleChooseDay(dayInfo){
        // dayInfo   
        // {
        //     "day":14, // 一个月中的第几天
        //     "date":"2020/02/14", // 该天日期
        //     "week":6, // 星期几
        //     "timestamp":1581609600, // 该天时间戳
        //     "isOtherMonthDay":false, // 该天是否为非本月
        //     "isFutureDay":false, // 该天是否为未来的天数
        //     "isToday":false // 某月中的某天是否为当天     
        // }
       }
   }
}
```
点击某天时的回调

### Classes

组件默认类名：
- choose-day：某天被选中
- weekend-day：某天为周末
- future-day：未来的天数
- other-month-day：其它月份的天数
- today: 今天

## :sos: FQA

**怎么自定义主题?**

你可以使用[深度作用选择器]覆盖组件默认样式。

## :bookmark_tabs: License

:warning: 本项目采用 [GLWTPL] 协议, 祝你好运！


[GLWTPL]: https://github.com/pigsking/vue-mark-calendar/blob/master/LICENSE
[imarker]: https://www.npmjs.com/package/imarker
[vue-mark-calendar]: https://www.npmjs.com/package/@pigsking/vue-mark-calendar
[examples]: https://github.com/pigsking/vue-mark-calendar/blob/master/src/App.vue
[深度作用选择器]: https://vue-loader.vuejs.org/guide/scoped-css.html#child-component-root-elements
[更新日志]: https://github.com/pigsking/vue-mark-calendar/blob/master/CHANGELOG.md
[相关示例]: https://github.com/pigsking/vue-mark-calendar/tree/master/examples/components/customs
