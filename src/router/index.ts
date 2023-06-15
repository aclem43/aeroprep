import FlightView from '@/views/FlightView.vue'
import PlanView from '@/views/PlanView.vue'
import PrepView from '@/views/PrepView.vue'
import SettingsView from '@/views/SettingsView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/plan',
      name: 'plan',
      component: PlanView,
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
    { path: '/:pathMatch(.*)*', name: 'NotFound', redirect: { name: 'prep' } },
  ],
})

export default router
