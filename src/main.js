import Vue from 'vue'
import App from './App.vue'
import VueSSE from 'vue-sse'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Toasted from 'vue-toasted';
import BootstrapVue from "bootstrap-vue"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

Vue.config.productionTip = false;
Vue.use(VueSSE);
Vue.use(VueAxios, axios);
Vue.use(BootstrapVue);
Vue.use(Toasted, {
  duration: 3000
});

new Vue({
  render: h => h(App),
}).$mount('#app');
