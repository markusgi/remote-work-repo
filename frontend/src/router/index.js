import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GamesView from '../views/GamesView.vue'
import TodosView from '../views/TodosView.vue'
import SpendRequestsView from '../views/SpendRequestsView.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: HomeView },
    { path: '/games', component: GamesView },
    { path: '/todos', component: TodosView },
    { path: '/spend-requests', component: SpendRequestsView },
  ],
})

export default router
