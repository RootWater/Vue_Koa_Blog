import Main from '@/components/main'

export default [{
  path: '/',
  alias: 'resume',
  redirect: '/resume'
}, {
  path: '/main',
  name: 'main',
  component: Main,
  children: [{
    path: '/resume',
    name: 'resume',
    component: () => import(/* Resume */'@/views/pages/Resume')
  }, {
    path: '/drip',
    name: 'drip',
    component: () => import(/* Drip */'@/views/pages/Drip')
  }, {
    path: '/messageBoard',
    name: 'messageBoard',
    component: () => import(/* Drip */'@/views/pages/MessageBoard')
  }, {
    path: '/artDetail/:id',
    name: 'artDetail',
    meta: {
      noCache: true
    },
    component: () => import(/* ArtDetail */'@/views/pages/ArtDetail')
  }]
}, {
  path: '*',
  name: 'error404',
  component: () => import(/* error404 */'@/views/error/error404')
}]
