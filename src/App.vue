<template>
  <div id="app">
    <div class="p-lg-5">
      <div class="title row">
        <div>
          <img width="100px" src="./assets/twitter-kafka-logo.png" alt="Responsive image"/>
        </div>
        <h1 class="text-lg-center">twitter-kafka</h1>
      </div>
      <div class="tweets col-lg-12">
        <sse-timeline/>
      </div>
    </div>
  </div>
</template>

<script>
  import SseTimeline from './components/Timeline'

  export default {
  name: 'app',
  components: {
    SseTimeline
  },
  data() {
    return {
      tweet: '',
      image: './assets/header_bg.jpg'
    }
  },
  methods: {

  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #00acee;
  /*background-color: #d1d6e655;*/
}

.tweets {
  color: darkslategrey;
}

.padded {
  padding: 16px;
}

</style>
