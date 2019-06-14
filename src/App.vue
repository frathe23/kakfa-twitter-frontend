<template>
  <div id="app">
    <div class="p-lg-5" >
      <h1 class="text-center">Twitter-Kafka</h1>
      <br>
      <div>
        <div class="col-lg-4 padded">
          <div class="col-12" style="margin-bottom: 16px">
            <button type="button" class="btn btn-primary" style="width: 100%; background-color: #00acee" v-on:click="sendTweet" >New Tweet <font-awesome-icon icon="paper-plane"/> </button>
          </div>
          <label class="col-lg-12">
            <b-form-textarea no-resize rows="4" class="textarea" v-model="tweet" placeholder="Write your tweet here"></b-form-textarea>
          </label>
        </div>
        <div class="tweets col-lg-12">
          <sse-timeline/>
        </div>
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
    sendTweet: function () {
      this.$http.post("http://192.168.233.143:5000/tweets", {
        "authors": "larghifra",
        "content": this.tweet,
        "location": "Varese"
      }).then(response => {
        this.$toasted.success('Sent post request: ' + response.status)
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
  color: #00acee;
  /*background-color: #d1d6e655;*/
}

.tweets {
  color: darkslategrey;
}

.textarea {
  width: 75%;
}
.padded {
  padding: 16px;
}

</style>
