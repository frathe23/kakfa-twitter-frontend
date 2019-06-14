<template>
  <div id="app">
    <div class="p-lg-5">
      <h1 class="text-center">Twitter-Kafka</h1>
      <br>
      <div class="row">
        <div class="col-lg-8">
          <sse-timeline/>
        </div>
        <div class="col-lg-4">
          <h4>Filters</h4>
          <div style="margin-bottom: 32px">
            <label class="col-lg-12">
              <input placeholder="hashtag" style="width: 50%;" />
            </label>
            <label class="col-lg-12">
              <input placeholder="mentions" style="width: 50%;" />
            </label>
            <label class="col-lg-12">
              <input placeholder="position" style="width: 50%;" />
            </label>
          </div>
          <div class="col-12" style="margin-bottom: 16px">
            <button type="button" class="btn btn-primary" style="width: 75%;" v-on:click="sendTweet">Post Tweet</button>
          </div>
          <label class="col-lg-12">
            <textarea class="textarea" v-model="tweet" placeholder="write your tweet here"></textarea>
          </label>
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
      // eslint-disable-next-line
      console.log(myObj);

      let strObject = JSON.stringify(myObj);
      // eslint-disable-next-line
      console.log(strObject);

      let json = JSON.parse(JSON.stringify(myObj));
      // eslint-disable-next-line
      console.log(json);

      this.$http.post("http://192.168.233.143:5000/tweets", {
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

.textarea {
  width: 75%;
}

</style>
