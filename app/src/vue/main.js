
import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

import {VueStore} from './modules/VueStore'

import App from './components/app.vue'
import Hello from './components/hello.vue'
import About from './components/about.vue'

Vue.use(VueRouter);

const routes = [
	{ path: '/', component: Hello },
	{ path: '/about', component: About },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

console.log("Printing VueStore Value:");
console.log(VueStore);

new Vue({
  el: '#app',
  store: VueStore,
  template: '<App/>',
  components: { App },
  router
}).$mount('#app');