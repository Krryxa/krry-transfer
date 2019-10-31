import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import KrryUI from './index.js'

Vue.use(KrryUI)
Vue.use(ElementUI);

new Vue({
  el: '#app',
  render: h => h(App)
})
