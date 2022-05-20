import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/meteo/current'
  },
  {
    path: '/meteo',
    redirect: '/meteo/current'
  },
  {
    path: '/meteo/:location',
    component: () => import('@/views/MeteoPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
