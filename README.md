# vue-mark-calendar
一个基于 Vue 2.x 开发的日历标记组件，版本记录请在[更新日志]中查看。

## :interrobang: Important
- [imarker] 已不再维护, 请使用 [vue-mark-calendar]
- 在未更新到 1.0.0 版本前请慎用

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
具体使用方法请查看具体[相关示例]。
### props

**markers**
- type: `Array`
- required: `false`

需要标记的天数

**sundayBegin**
- type: `Boolean`
- default: `false`
- required: `false`

 设置一周的开始为星期天

**hideOtherMonthDay**
- type: `Boolean`
- default: `false`
- required: `false`

 隐藏其它月份的天数
 
**hideOtherMonthMarker**
- type: `Boolean`
- default: `false`
- required: `false`

 隐藏其它月份的标记

 
**disabledFutureDay**
- type: `Boolean`
- default: `false`
- required: `false`

 设置未来的天数不可点击

 
**format**
- type: `String`
- default: "YYYY/MM/DD"
- required: `false`

 日期格式化形式,目前只支持 "YYYY/MM/DD"、"YYYY/M/D"、"YYYY-MM-DD"、"YYYY-M-D"
 
**weekText**
- type: `Array`
- default: `["一", "二", "三", "四", "五", "六", "日"]`
- required: `false`

 周几的文字描述
 
**hideMarker**
- type: `Boolean`
- required: `false`

 隐藏所有的标记
 
**todayText**
- type: `String`
- required: `false`

 周几的文字描述

**disabledSwitchMonth**
- type: `Boolean`
- default: `false`
- required: `false`

 禁用月份切换

### methods

**chooseDate()**

- type: `String`
- required：`false`

选中某天，传参数时选中所传日期，不传参数时选中当天

**getDateObj()**

- parameter type: `String`
- parameter required：`false`
- return: `current date object`

获取日期对象，传参数时选中所传日期的对象，不传参数时获取当天日期对象

### events

**date**
- return:`current date object`

点击某天时的回调

### date object
`getDateObj` 方法返回和 `date` 接收到的时间对象
```javascirpt
// {
//     "day":14, // 一个月中的第几天
//     "date":"2020/02/14", // 该天日期
//     "week":6, // 星期几
//     "timestamp":1581609600, // 该天时间戳
//     "isOtherMonthDay":false, // 该天是否为非本月
//     "isFutureDay":false, // 该天是否为未来的天数
//     "isToday":false // 某月中的某天是否为当天     
// }
```
### classes

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
[相关示例]：https://github.com/pigsking/vue-mark-calendar/tree/master/examples/components/customs