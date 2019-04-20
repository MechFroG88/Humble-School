import Vue from 'vue';
import App from './App.vue';
import router from './router';
import '../node_modules/spectre.css/src/spectre.scss';
import './assets/scss/style.scss';

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
