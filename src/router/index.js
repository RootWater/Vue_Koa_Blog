import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import ViewUI from 'view-design'

Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  ViewUI.LoadingBar.start()
  next()
})

router.afterEach((to, from) => {
  ViewUI.LoadingBar.finish()
})

export default router
