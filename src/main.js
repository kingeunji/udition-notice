import Vue from 'vue'
import App from './App.vue'
import router from "./router/index.js"
import VueMq from "vue-mq"

Vue.use(VueMq, {
  breakpoints: { 
    small: 415,
    large: 850, 
    whatever: Infinity }
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
