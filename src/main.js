import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSweetalert2 from 'vue-sweetalert2'
import Vuelidate from 'vuelidate'
import moment from 'moment'
import 'bootstrap/dist/css/bootstrap.min.css'


import { VuejsDatatableFactory } from 'vuejs-datatable';
 
Vue.use( VuejsDatatableFactory );


Vue.config.productionTip = false
Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY hh:mm')
  }
});
Vue.use(VueAxios, axios)

Vue.use(VueSweetalert2);
Vue.use(Vuelidate);
//Vue.component("v-select", vSelect);
//import "vue-select/dist/vue-select.css";
axios.defaults.headers.common["Authorization"] = 'Bearer ' + localStorage.getItem("token");
//import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
//Vue.use(AxiosPlugin);

//
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')