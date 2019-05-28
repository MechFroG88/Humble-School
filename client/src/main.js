import Vue from 'vue';
import App from './App.vue';
import router from './router';
import '../node_modules/spectre.css/src/spectre.scss';
import './assets/scss/style.scss';
import './assets/scss/icons/style.css';
import './dist/animate.css';

// // Drop down notifications
// import VueFlashMessage from 'vue-flash-message';
// import 'vue-flash-message/dist/vue-flash-message.min.css';
// Vue.use(VueFlashMessage, { 
//   method: 'notification',
//   messageOptions: {
//     timeout: 4000,
//     important: true,
//   }
// });

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
