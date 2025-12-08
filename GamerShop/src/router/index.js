import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import ProductView from '../views/ProductView.vue'
import UsuariosView from '../views/UsuariosView.vue'
import AboutView from '../views/AboutView.vue'
import { authService } from '../services/mockapi.js'

const routes = [
  { 
    path: '/', 
    redirect: '/login' 
  },
  { 
    path: '/login', 
    component: LoginView 
  },
  {
    path: '/dashboard',
    component: DashboardView,
    meta: { requiresAuth: true },
    children: [
      { path: 'productos', component: ProductView },
      { path: 'usuarios', component: UsuariosView }
    ]
  },
  { 
    path: '/about', 
    component: AboutView,
    meta: { requiresAuth: true }  // ← También proteger "Acerca de"
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Guardia de navegación
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  
  if (requiresAuth && !authService.isAuthenticated()) {
    next('/login')
  } else if (to.path === '/login' && authService.isAuthenticated()) {
    next('/dashboard/productos')
  } else {
    next()
  }
})

export default router