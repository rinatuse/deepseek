import { createRouter, createWebHistory } from 'vue-router'
import ClientsListView from '../views/ClientsListView.vue'
import ClientFormView from '../views/ClientFormView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/clients',
    },
    {
      path: '/clients',
      name: 'clients-list',
      component: ClientsListView,
    },
    {
      path: '/clients/new',
      name: 'clients-new',
      component: ClientFormView,
    },
    {
      path: '/clients/:id',
      name: 'client-edit',
      component: ClientFormView,
    },
  ],
})

export default router