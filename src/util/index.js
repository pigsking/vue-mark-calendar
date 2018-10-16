export default {
    /**
  * @description check the leap year
  * @param {Number} year
  * @return {Boolean}
  */
    isLeapYear(year) {
        return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0
    },
    
}