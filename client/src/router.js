import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: { name: 'model' },
    },
    // {
    //   path: '/language',
    //   name: 'language',
    //   component: () => import('./pages/language.vue'),
    // },
    // {
    //   path: '/performance',
    //   name: 'performance',
    //   component: () => import('./pages/performance.vue'),
    // },
    // {
    //   path: '/3d/',
    //   name: '3d',
    //   component: () => import('./pages/3d.vue'),
    // },
    // {
    //   path: '/details',
    //   name: 'details',
    //   component: () => import('./pages/details.vue'),
    // },
    {
      path: '/model',
      name: 'model',
      component: () => import('./pages/model.vue'),
    },
  ],
});
