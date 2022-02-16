import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

export const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Home.vue'),
    meta: {
      icon: 'mdi-home'
    }
  },
  {
    path: '/About',
    name: 'About',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: { icon: 'mdi-account' }
  },
  {
    path: '/Portfolio',
    name: 'Portfolio',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Projects.vue'),
    meta: { icon: 'mdi-folder-multiple' }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
