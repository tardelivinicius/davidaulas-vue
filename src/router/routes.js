import store from '../store'

const routes = [
  {
    path: '/',
    component: () => import('layouts/login/Login.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/authenticated/Header.vue'),
    children: [
      { path: 'students', component: () => import('pages/students/Students.vue') },
      { path: 'courses', component: () => import('pages/courses/Courses.vue') },
      { path: 'classes', component: () => import('pages/classes/Classes.vue') },
      { path: 'finances', component: () => import('pages/finances/Finances.vue') },
      { path: 'reports', component: () => import('pages/reports/Reports.vue') }
    ],
    beforeEnter: (to, from, next) => {
      if (!store.getters['common/access_token']) {
        clearUserData()
        next({ name: '' })
      } else {
        next()
      }
    }
  }
]

function clearUserData () {
  store.dispatch('common/SET_ACCESS_TOKEN', ['', ''])
}

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
