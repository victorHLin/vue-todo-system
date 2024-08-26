import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/todo',
      name: 'todo',
      component: () => import('../views/TodoView.vue'),
      children:[
        {
          path: '',
          name: 'default',
          component: () => import('../views/TodoAllView.vue')
        },
        {
          path: 'all',
          name: 'all',
          component: () => import('../views/TodoAllView.vue')
        },{
          path: 'done',
          name: 'done',
          component: () => import('../views/TodoDoneView.vue')
        },
        {
          path: 'working',
          name: 'working',
          component: () => import('../views/TodoWorkingView.vue')
        }
      ]
    },{
      path:'/:pathMatch(.*)*',
      name:'notFound',
      component: ()=> import('../views/NotFoundView.vue')
    }
  ]
})

export default router
