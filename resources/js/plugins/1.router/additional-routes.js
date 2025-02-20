/* const emailRouteComponent = () => import('@/pages/apps/email/index.vue')
 */
// 👉 Redirects
export const redirects = [
  // ℹ️ We are redirecting to different pages based on role.
  // NOTE: Role is just for UI purposes. ACL is based on abilities.
  {
    path: '/',
    name: 'index',
    redirect: to => {
      // TODO: Get type from backend
      const userData = useCookie('userData')
      const userRole = userData.value?.role
      if (userRole)
        return { name: 'monitoreo' }
     /*  if (userRole === 'client')
        return { name: 'monitoreo' } */

      return { name: 'login', query: to.query }
    },
  },
  /* {
    path: '/pages/user-profile',
    name: 'pages-user-profile',
    redirect: () => ({ name: 'pages-user-profile-tab', params: { tab: 'profile' } }),
  },
  {
    path: '/pages/account-settings',
    name: 'pages-account-settings',
    redirect: () => ({ name: 'pages-account-settings-tab', params: { tab: 'account' } }),
  }, */
]

export const routes = [
    { path: '/', redirect: '/monitoreo' },
    {
        path: '/login', // 📌 Asegúrate de que la ruta sea correcta
        name: 'login',
        meta: {
            layout: 'blank',
/*             public: true, */
            unauthenticatedOnly: true,
        },
        component: () => import('@/views/login/Index.vue')//DashboardAnalytics
    },
    {
        path: '/monitoreo', // 📌 Asegúrate de que la ruta sea correcta
        name: 'monitoreo',
        component: () => import('@/views/intranet/monitoreo/Index.vue'),//Dashboard,//DashboardAnalytics
        meta: { requiresAuth: true } // Ruta protegida
    },
    {
        path: '/monitoreo/preventa/:id', // 📌 Asegúrate de que la ruta sea correcta
        name: 'preventa',
        component: () => import('@/views/intranet/preventa/Index.vue'),//Dashboard,//DashboardAnalytics
        props: true, // Esto permite recibir parámetros como props
        meta: { requiresAuth: true } // Ruta protegida
    }
];
