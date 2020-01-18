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
date
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
:warning: The argument format must be the same as the `props.format`.

$refs.chooseTargetDate
```javascirpt
this.$refs.calendar.chooseTargetDate('2020/02/14');
```

$refs.getDateObj
```javascirpt
this.$refs.calendar.getDateObj('2020/02/14');
```

## :bookmark_tabs: License
:warning: Under the [GLWTPL] license, use with caution.


[GLWTPL]: https://github.com/me-shaon/GLWTPL
[imarker]: https://www.npmjs.com/package/imarker
[vue-mark-calendar]: https://www.npmjs.com/package/@pigsking/vue-mark-calendar