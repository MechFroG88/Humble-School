import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: { name: 'home' },
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('./pages/home.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./pages/login.vue'),
    },
    {
      path: '/admin/',
      component: () => import('./pages/homepage.vue'),
      children: [
        {
          path: '',
          redirect: { name: 'group' },
        },
        {
          path: 'group',
          name: 'group',
          component: () => import('./pages/admin/group.vue'),
        },
        {
          path: 'users',
          name: 'users',
          component: () => import('./pages/admin/users.vue'),
        },
        {
          path: 'groupDetails',
          name: 'groupDetails',
          component: () => import('./pages/admin/groupDetails.vue'),
        },
      ],
    },
    // {
    //   path: '/performance',
    //   name: 'performance',
    //   component: () => import('./pages/performance.vue'),
    // },
    {
      path: '/3d',
      name: '3d',
      component: () => import('./pages/3d.vue'),
    },
    {
      path: '/details',
      name: 'details',
      component: () => import('./pages/details.vue'),
    },
    {
      path: '/model',
      name: 'model',
      component: () => import('./pages/model.vue'),
    },
  ],
});
