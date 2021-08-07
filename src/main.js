import Vue from 'vue'
import VueSwal from 'vue-swal'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueAxios from 'vue-axios'
import axios from 'axios'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import SortedTablePlugin from "vue-sorted-table";

Vue.use(SortedTablePlugin);
Vue.use(BootstrapVue)
Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(VueSwal)
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')