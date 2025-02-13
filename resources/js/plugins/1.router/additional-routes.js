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
    /* {
        path: '/dashboard', // 📌 Asegúrate de que la ruta sea correcta
        name: 'dashboard',
        component: () => import('@/views/dashboards/Dashboard.vue'),//Dashboard,//DashboardAnalytics
        meta: { requiresAuth: true } // Ruta protegida
    },
    {
        path: '/seguridad/modulos', // 📌 Asegúrate de que la ruta sea correcta
        name: 'modulos',
        component: () => import('@/views/modulos/Index.vue'),//DashboardAnalytics
        meta: { requiresAuth: true } // Ruta protegida
    },
    {
        path: '/seguridad/usuarios', // 📌 Asegúrate de que la ruta sea correcta
        name: 'usuarios',
        component: () => import('@/views/users/Index.vue'),//DashboardAnalytics
        meta: { requiresAuth: true } // Ruta protegida
    },
    {
        path: '/seguridad/roles-permisos/roles', // 📌 Asegúrate de que la ruta sea correcta
        name: 'roles',
        component: () => import('@/views/roles-permisos/roles/Index.vue'),//DashboardAnalytics
        meta: { requiresAuth: true } // Ruta protegida
    },
    {
        path: '/seguridad/roles-permisos/permisos', // 📌 Asegúrate de que la ruta sea correcta
        name: 'permisos',
        component: () => import('@/views/roles-permisos/permisos/Index.vue'),//DashboardAnalytics
        meta: { requiresAuth: true } // Ruta protegida
    },

    {
        path: '/maestros/oficinas', // 📌 Asegúrate de que la ruta sea correcta
        name: 'oficinas',
        component: () => import('@/views/maestros/oficinas/Index.vue'),//DashboardAnalytics
        meta: { requiresAuth: true } // Ruta protegida
    },
    {
        path: '/maestros/tipo-documentos', // 📌 Asegúrate de que la ruta sea correcta
        name: 'tipo-documentos',
        component: () => import('@/views/maestros/tipos_documentos/Index.vue'),//DashboardAnalytics
        meta: { requiresAuth: true } // Ruta protegida
    },
    {
        path: '/maestros/tipo-movimientos', // 📌 Asegúrate de que la ruta sea correcta
        name: 'tipo-movimientos',
        component: () => import('@/views/maestros/tipo_movimientos/Index.vue'),//DashboardAnalytics
        meta: { requiresAuth: true } // Ruta protegida
    },
    {
        path: '/maestros/areas', // 📌 Asegúrate de que la ruta sea correcta
        name: 'areas',
        component: () => import('@/views/maestros/areas/Index.vue'),//DashboardAnalytics
        meta: { requiresAuth: true } // Ruta protegida
    },
    {
        path: '/maestros/estados', // 📌 Asegúrate de que la ruta sea correcta
        name: 'estados',
        component: () => import('@/views/maestros/estados/Index.vue'),//DashboardAnalytics
        meta: { requiresAuth: true } // Ruta protegida
    },
    {
        path: '/maestros/importancias', // 📌 Asegúrate de que la ruta sea correcta
        name: 'importancias',
        component: () => import('@/views/maestros/importancias/Index.vue'),//DashboardAnalytics
        meta: { requiresAuth: true } // Ruta protegida
    }, */

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
        path: '/monitoreo/preventa', // 📌 Asegúrate de que la ruta sea correcta
        name: 'preventa',
        component: () => import('@/views/intranet/monitoreo/Index.vue'),//Dashboard,//DashboardAnalytics
        meta: { requiresAuth: true } // Ruta protegida
    }
];
