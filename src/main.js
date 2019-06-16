import Vue from 'vue'
import App from './App.vue'
import VueSSE from 'vue-sse'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Toasted from 'vue-toasted';
import BootstrapVue from "bootstrap-vue"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import {library} from '@fortawesome/fontawesome-svg-core'
import {faBan, faClock, faMapMarkerAlt, faPaperPlane, faRedoAlt, faSyncAlt} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

library.add(faPaperPlane, faRedoAlt, faSyncAlt, faBan, faMapMarkerAlt, faClock );
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;
Vue.use(VueSSE);
Vue.use(VueAxios, axios);
Vue.use(BootstrapVue);
Vue.use(Toasted, {
  duration: 3000,
  keepOnHover: true,
  position: "bottom-left",
});

new Vue({
  render: h => h(App),
}).$mount('#app');
