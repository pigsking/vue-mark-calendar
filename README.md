# calendar


## API
### Props
 name | type | default | description|
| ------ | ------ | ------ |------ |
| weekText | String | ["S", "M", "T", "W", "T", "F", "S"] | week text
| disabledFutureDay | Boolean | false | if true, future days status is disabled |
| hideOtherMonthDay | Boolean | false | if true, other month days status is hide and disabled |
| markers | Array | - | day markes |

### Slots
 name   | description|
| ------ | ------ |
| month switch | custom month switch theme | 

### Events
Receive :
```html
   <Calendar @month="handleMonthChange($event)" @day="handleDayChange($event)" />
```
Initiate :
```javascript
   <Calendar ref="calendar" />

   // switch to prev month 
   this.$refs.calendar.switchToPrevMonth()

   // switch to next month 
   this.$refs.calendar.switchToNextMonth()

   // go to target date
   this.$refs.calendar.chooseSpecifiedDate('2018-11-09')

```
## Theme
### Marker
![Markes](./public/images/01.png)
```html

<template>
 <div id="calendar">
    <Calendar :markers="markers"/>
 </div>
</template>
<script>
 export default {
     data(){
         return{
              markers: [
                {
                date: "2018-10-20",
                className: "love"
                },
                {
                date: "2018-10-30",
                className: "miss"
                },
                {
                date: "2018-10-01",
                className: "dream"
                }
            ],
         }
     }
 }
</script>
<style>
#calendar /deep/ .love span {
  color: #fff;
  background-color: #7b1fa2;
}
#calendar /deep/ .miss span {
  color: #fff;
  background-color: #ff4081;
}

#calendar /deep/ .dream span {
  color: #fff;
  background-color: #448aff;
}
</style>
```


## License
[GLWTPL](./LICENSE)