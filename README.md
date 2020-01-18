# vue-mark-calendar
A simple calendar mark component for vuejs2.x. 

## :interrobang: Breaking change
[imarker] is no longer maintained, please use [vue-mark-calendar].

## :package: Install
```
yarn add @pigsking/vue-mark-calendar --save-dev
```
## :grey_question: Useage
```javscript
// main.js
import Vue from 'vue'
import Calendar from @pigsking/vue-mark-calendar

Vue.use(Calendar)

//App.vue 
<Calendar></Calendar>
```

## :open_book: API
You might want an [examples].

```javascirpt
<Calendar 
    ref="calendar" 
    sundayBegin
    hideOtherMonthDay
    disabledFutureDay   
    hideOtherMonthMarker
    format="YYYT-MM-DD"
    @date="handleDateChange($event)"
></Calendar>
```
### Events
**date**
```javascript
handleDateChange(dayInfo){
    // dayInfo:
    // {
    //     "day":18,
    //     "date":"2020-1-18",
    //     "week":6,
    //     "timestamp":1579276800000,
    //     "isOtherMonthDay":false,
    //     "isFutureDay":false
    // }
}
```
### props
| props | type | default |
| ----  | ---- | ---- |
| markers | Array | [ ] |
| sundayBegin | Boolean | false |
| hideOtherMonthDay | Boolean | false |
| disabledFutureDay | Boolean | false |
| hideOtherMonthMarker | Boolean | false |
| format | String | "YYYY/MM/DD" | 
| weekText | Array | ["一", "二", "三", "四", "五", "六", "日"] 

### methods

**$refs.chooseTargetDate**
```javascirpt
this.$refs.calendar.chooseTargetDate('2020/02/14');
```

**$refs.getDateObj**
```javascirpt
const dayInfo = this.$refs.calendar.getDateObj('2020/02/14');
```
### classes
You might want to custom theme.
- choose-day
- weekend-day
- future-day
- other-month-day

## :sos: FAQ
**How to change the calendar theme?**

You can use the >>> combinator([Deep Selectors]).

## :bookmark_tabs: License
:warning: Under the [GLWTPL] license, use with caution.


[GLWTPL]: https://github.com/pigsking/vue-mark-calendar/blob/master/LICENSE
[imarker]: https://www.npmjs.com/package/imarker
[vue-mark-calendar]: https://www.npmjs.com/package/@pigsking/vue-mark-calendar
[examples]: https://github.com/pigsking/vue-mark-calendar/blob/master/src/Eat.vue
[Deep Selectors]: https://vue-loader.vuejs.org/guide/scoped-css.html#child-component-root-elements