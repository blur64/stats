import { createRouter, createWebHistory } from 'vue-router';

import TablesPage from '../pages/TablesPage.vue';
import FilterPage from '../pages/FilterPage.vue';
import VisualizationPage from '../pages/VisualizationPage.vue';
import AggregationPage from '../pages/AggregationPage.vue';
import LoginPage from '../pages/LoginPage.vue';
import RegistrationPage from '../pages/RegistrationPage.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: TablesPage,
  },
  {
    path: '/filter',
    name: 'filter',
    component: FilterPage,
  },
  {
    path: '/visualisation',
    name: 'visualisation',
    component: VisualizationPage,
  },
  {
    path: '/aggregation',
    name: 'aggregation',
    component: AggregationPage,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
    props: true,
  },
  {
    path: '/registration',
    name: 'registration',
    component: RegistrationPage,
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
