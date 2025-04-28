import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../../ui/views/CharactersView.vue'),
    },
    {
      path: '/favourites',
      name: 'favourites',
      component: () => import('../../ui/views/FavouritesView.vue'),
    },
    {
      path: '/characters/:id',
      name: 'character',
      component: () => import('../../ui/views/CharacterView.vue'),
    },
  ],
})

export default router
