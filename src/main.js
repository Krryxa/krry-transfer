import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import { krryCascader, krryPaging } from './index.js'

Vue.use(krryCascader)
Vue.use(krryPaging)

Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
