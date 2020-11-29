# vue-mark-calendar
一个基于 Vue 2.x 开发的日历标记组件

## :interrobang: 重要提示
- [imarker] 已不再维护, 请使用 [vue-mark-calendar]
- 在未更新到 1.0.0 版本前请慎用

## :package: 安装
```
npm install @pigsking/vue-mark-calendar
//or
yarn add @pigsking/vue-mark-calendar
```
## :grey_question: 使用
```javscript
// main.js
import Vue from 'vue'
import Calendar from '@pigsking/vue-mark-calendar'

Vue.use(Calendar)
```

## :open_book: API

### 属性

| 属性 | 说明 | 类型 | 默认值 | 版本
| ----  | ---- | ---- | ---- | ---- |
| markers | 需要标记的天数 | Array | [ ] | 0.1.0 |
| sundayBegin | 设置一周的开始为星期天 | Boolean | false | 0.1.0 |
| hideOtherMonthDay | 隐藏其它月份的天数 | Boolean | false | 0.1.0 |
| hideOtherMonthMarker | 隐藏其它月份的标记 | Boolean | false | 0.1.0 |
| disabledFutureDay | 设置未来的天数不可点击 | Boolean | false | 0.1.0 |
| format | 日期格式化形式 | "YYYY/MM/DD"、"YYYY/M/D"、"YYYY-MM-DD"、"YYYY-M-D" | "YYYY/MM/DD" | 
| weekText | 周几的文字描述 | Array | ["一", "二", "三", "四", "五", "六", "日"] |
| hideMarker | 隐藏所有的标记 | Boolean | false | 0.3.0 |
 
### 方法

**$refs.chooseDate**
```javascirpt
// 回到今天
this.$refs.calendar.chooseDate();

// 选中某天
this.$refs.calendar.chooseDate('2020/02/14');
```

**$refs.getDateObj**
```javascirpt
// 获取今天的日期对象
const dayInfo = this.$refs.calendar.getDateObj();

// 获取某天的日期对象
const dayInfo = this.$refs.calendar.getDateObj('2020/02/14');

// dayInfo
// {
//     "day":14, // 一个月中的第几天
//     "date":"2020/02/14", // 该天日期
//     "week":6, // 星期几
//     "timestamp":1581609600000, // 该天时间戳
//     "isOtherMonthDay":false, // 该天是否为非本月
//     "isFutureDay":false // 该天是否为未来的天数
// }
```

### 事件

| 名称 | 说明 | 回调参数 | 版本
| ----  | ---- | ---- | ---- |
| date | 点击某天时的回调 | (dayInfo) => void | 0.1.0 |


### 类名

某天满足某些条件时的类名：
- choose-day：某天被选中
- weekend-day：某天为周末
- future-day：未来的天数
- other-month-day：其它月份的天数

## :sos: 常见问题

**怎么自定义主题?**

你可以使用[深度作用选择器]

## 未来

未来不一定会来，若来了可在[更新日志]中查看.

- [x] 属性更改后重新初始化日历
- [x] 隐藏全部标记]
- [ ] 多个日期可使用一个标记
- [ ] 隐藏月份切换按钮

## :bookmark_tabs: 协议

:warning: 本项目采用 [GLWTPL] 协议, 祝你好运！


[GLWTPL]: https://github.com/pigsking/vue-mark-calendar/blob/master/LICENSE
[imarker]: https://www.npmjs.com/package/imarker
[vue-mark-calendar]: https://www.npmjs.com/package/@pigsking/vue-mark-calendar
[examples]: https://github.com/pigsking/vue-mark-calendar/blob/master/src/App.vue
[深度作用选择器]: https://vue-loader.vuejs.org/guide/scoped-css.html#child-component-root-elements
[更新日志]: https://github.com/pigsking/vue-mark-calendar/blob/master/CHANGELOG.md