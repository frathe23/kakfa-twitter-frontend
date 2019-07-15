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
        <template v-if="loggedIn">
          <timeline v-bind:author="author" v-bind:location="location"/>
        </template>
        <template v-else>
          <div>
            <label class="col-lg-12">
              <input v-model="author" placeholder="name" />
            </label>
            <label class="col-lg-12">
              <input v-model="location" placeholder="location" />
            </label>
            <button type="button" class="btn btn-primary" v-on:click="login">
              Log In
            </button>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  import Timeline from './components/Timeline'

  export default {
  name: 'app',
  components: {
    Timeline
  },
  data() {
    return {
      author: '',
      location: '',
      loggedIn: false,
      image: './assets/header_bg.jpg'
    }
  },
  methods: {
    login () {
      if (this.author && this.location)
        this.loggedIn = true
    },
    logout () {
      this.loggedIn = false
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

.padded {
  padding: 16px;
}

</style>
