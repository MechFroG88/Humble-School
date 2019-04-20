import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: { name: 'language' },
    },
    {
      path: '/language',
      name: 'language',
      component: () => import('./pages/language.vue'),
    },
    {
      path: '/performance',
      name: 'performance',
      component: () => import('./pages/performance.vue'),
    },
  ],
});
