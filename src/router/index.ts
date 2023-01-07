import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import PrepView from '@/views/PrepView.vue'
import SettingsView from '@/views/SettingsView.vue'
import FlightView from '@/views/FlightView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/prep',
      name: 'prep',
      component: PrepView,
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView,
    },
    {
      path: '/fly',
      name: 'fly',
      component: FlightView,
    },
  ],
})

export default router
