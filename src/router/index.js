import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Cosmetic from '@/components/Cosmetics'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Edit from '@/components/Edit'
import AddCosmetic from '@/components/AddCosmetic'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/cosmetics/publisher',
      name: 'Cosmetics',
      component: Cosmetic,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        guest: true
      }
    },
    {
      path: '/edit',
      name: 'Edit',
      component: Edit,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/cosmetics/publisher/add',
      name: 'AddCosmetic',
      component: AddCosmetic,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (sessionStorage.getItem('token') == null) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
