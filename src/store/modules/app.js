import { ss } from '@/libs/tools'

const states = {
  currentActivePage: '',
  user: {},
  isLogin: false
}

const mutations = {
  setCurrentActivePage (state, currentActivePage) {
    state.currentActivePage = currentActivePage
    ss.set('currentActivePage', currentActivePage)
  },
  setUser (state, user = {}) {
    state.user = user
    state.isLogin = true
    ss.set('user', user)
    ss.set('isLogin', true, 'bool')
  },
  loginOut (state) {
    state.user = {}
    state.isLogin = false
    ss.remove('user')
    ss.remove('isLogin')
    location.reload()
  }
}

const actions = {}

export default {
  states,
  mutations,
  actions
}
