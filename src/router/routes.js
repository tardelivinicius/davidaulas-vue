import store from '../store'

const routes = [
  {
    path: '/',
    component: () => import('layouts/login/Login.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue') }
    ],
    beforeEnter: (to, from, next) => {
      console.log(store.getters['common/access_token'])
      if (store.getters['common/access_token']) {
        window.location = '/students'
      } else {
        clearUserData()
        next()
      }
    }
  },
  {
    path: '/',
    component: () => import('layouts/authenticated/Header.vue'),
    children: [
      {
        path: 'students',
        name: 'students',
        component: () => import('pages/students/Students.vue'),
        meta: { title: 'students' }
      },
      {
        path: 'student/:id',
        name: 'student',
        component: () => import('pages/students/Student.vue'),
        meta: { title: 'student' }
      },
      {
        path: 'courses',
        name: 'courses',
        component: () => import('pages/courses/Courses.vue'),
        meta: { title: 'courses' }
      },
      {
        path: 'classes',
        name: 'classes',
        component: () => import('pages/classes/Classes.vue'),
        meta: { title: 'classes' }
      },
      {
        path: 'finances',
        name: 'finances',
        component: () => import('pages/finances/Finances.vue'),
        meta: { title: 'finances' }
      },
      {
        path: 'reports',
        name: 'reports',
        component: () => import('pages/reports/Reports.vue'),
        meta: { title: 'reports' }
      }
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
