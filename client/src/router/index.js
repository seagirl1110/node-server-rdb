import { createRouter, createWebHistory } from 'vue-router'

import EventsView from '@/views/EventsView.vue'
import EventView from '@/views/EventView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: EventsView,
    },
    {
      path: '/:id',
      component: EventView,
    },
  ],
})

export default router
