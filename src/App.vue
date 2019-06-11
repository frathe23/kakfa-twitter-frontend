<template>
  <div id="app">
    <div class="p-lg-5">
      <h1 class="text-md-left">Twitter Kafka</h1>
      <br>
      <div class="row">
        <div class="col-lg-8">
          <sse-timeline/>
        </div>
        <div class="col-lg-4">
          <label class="col-sm-12">
            <textarea v-model="tweet" placeholder="write your tweet here"></textarea>
          </label>
          <div class="col-sm-12">
            <button type="button" class="btn btn-primary" v-on:click="sendTweet">Post Tweet</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SseTimeline from './components/SSETimeline'

  export default {
  name: 'app',
  components: {
    SseTimeline
  },
  data() {
    return {
      tweet: ''
    }
  },
  methods: {
    sendTweet: function () {
      const myObj = {
        name: 'Skip',
        age: 2,
        favoriteFood: 'Steak'
      };
      this.$toasted.info(JSON.stringify(myObj));
      let json = JSON.parse(JSON.stringify(myObj));
      this.$toasted.info(json);
      this.$http.post("http://192.168.178.45:5000/tweets", {
        "authors": "paolorossi",
        "content": this.tweet,
        "location": "Milano"
      }).then(response => {
        this.$toasted.success('sent post request: ' + response.status)
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
