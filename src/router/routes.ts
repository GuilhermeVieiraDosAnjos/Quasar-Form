import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/IndexPage.vue')
      },
      {
        path: 'register',
        component: ()=> import('pages/RegisterPage.vue'),
        children: [
          {
            path: 'novo',
            name: 'Novo Assinante',
            component: import('pages/RegisterPage.vue')
          }
        ]
      },
    ],
  },

];

export default routes;
