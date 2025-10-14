import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ForgotPasswordView from '../views/ForgotPasswordView.vue'
import MainLayout from '../views/MainLayout.vue'
import DashboardView from '../views/DashboardView.vue'

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: ForgotPasswordView,
  },
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: DashboardView,
      },
      {
        path: 'cattle',
        name: 'cattle-list',
        component: () => import('../components/CattleList.vue'),
      },
      {
        path: 'cattle/add',
        name: 'cattle-add',
        component: () => import('../components/CattleAdd.vue'),
      },
      {
        path: 'cattle/archive',
        name: 'cattle-archive',
        component: () => import('../components/CattleArchive.vue'),
      },
      {
        path: 'breeding',
        name: 'breeding-records',
        component: () => import('../components/BreedingRecords.vue'),
      },
      {
        path: 'breeding/calendar',
        name: 'breeding-calendar',
        component: () => import('../components/BreedingCalendar.vue'),
      },
      {
        path: 'feeding',
        name: 'feeding-plans',
        component: () => import('../components/FeedingPlans.vue'),
      },
      {
        path: 'feeding/inventory',
        name: 'feed-inventory',
        component: () => import('../components/FeedInventory.vue'),
      },
      {
        path: 'health',
        name: 'health-records',
        component: () => import('../components/HealthRecords.vue'),
      },
      {
        path: 'health/vaccination',
        name: 'vaccination',
        component: () => import('../components/Vaccination.vue'),
      },
      {
        path: 'health/diseases',
        name: 'diseases',
        component: () => import('../components/DiseaseRecords.vue'),
      },
      {
        path: 'statistics/production',
        name: 'production-stats',
        component: () => import('../components/ProductionStats.vue'),
      },
      {
        path: 'statistics/health',
        name: 'health-stats',
        component: () => import('../components/HealthStats.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// 添加导航守卫
router.beforeEach((to, from, next) => {
  // 检查是否已认证
  const isAuthenticated = localStorage.getItem('isAuthenticated')

  // 如果访问的不是登录页、注册页或忘记密码页且未认证，则重定向到登录页
  if (
    to.name !== 'login' &&
    to.name !== 'register' &&
    to.name !== 'forgot-password' &&
    !isAuthenticated
  ) {
    next({ name: 'login' })
  }
  // 如果已认证且尝试访问登录页、注册页或忘记密码页，则重定向到dashboard
  else if (
    (to.name === 'login' || to.name === 'register' || to.name === 'forgot-password') &&
    isAuthenticated
  ) {
    next({ name: 'dashboard' })
  }
  // 其他情况允许访问
  else {
    next()
  }
})

export default router
