<template>
  <div id="app">
    <Calendar :markers="markers" />
  </div>
</template>

<script>
import Calendar from './components/Calendar.vue'

export default {
  name: 'app',
  components: {
    Calendar
  },
  data() {
    return {
      markers: [
        {
          date: '2018/10/20',
          className: 'love'
        },
        {
          date: '2018/10/30',
          className: 'miss'
        },
       
        {
          date: '2018/10/1',
          className: 'dream'
        }
      ]
    }
  }
}
</script>

<style>
#app {
  width: 380px;
  margin: auto;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#app /deep/ .love {
  background-color: #d32f2f;
}
#app /deep/ .miss {
  background-color: #ff4081;
}

#app /deep/ .dream {
  background-color: #448aff;
}
</style>
