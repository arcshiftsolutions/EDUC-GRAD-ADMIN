import Vue from 'vue';
import App from './App.vue';
import router from './router';
import BootstrapVue from 'bootstrap-vue';
import VueFilterDateParse from '@vuejs-community/vue-filter-date-parse';
import VueFilterDateFormat from '@vuejs-community/vue-filter-date-format';
// Install BootstrapVue

//import store from './store';
import SmartTable from 'vuejs-smart-table';
require('../node_modules/@bcgov/bootstrap-theme/dist/css/bootstrap-theme.min.css')
Vue.config.productionTip = false;
Vue.use(SmartTable)
Vue.use(BootstrapVue)
Vue.use(VueFilterDateParse)
Vue.use(VueFilterDateFormat)
new Vue({
  router,
//  store,
  render: h => h(App)
}).$mount('#app');
