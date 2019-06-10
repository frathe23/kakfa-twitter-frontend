<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <div>
      <button type="button" class="btn btn-primary" v-on:click="sendTweet">Post Tweet</button>
    </div>
    <sse-timeline/>
  </div>
</template>

<script>
  import SseTimeline from './components/SSETimeline'

  export default {
  name: 'app',
  components: {
    SseTimeline
  },
  methods: {
    sendTweet: function () {
      this.$http.post("http://192.168.178.45:5000/tweets", {
        "authors": "paolorossi",
        "content": "Fantastic tool! #wow #lovethis @lucabianchi @marioverdi",
        "location": "Milano"
      }).then(response => {
        this.$toasted.show('sent post request: ' + response.status)
      }, response => {
        this.$toasted.error('error post request: ' + response.status)
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
