import Vue from 'vue'
import ViewUI from 'view-design'
import ModalFooter from '@/components/modalFooter/ModalFooter'
import api from '@/api'

import 'view-design/dist/styles/iview.css'

Vue.use(ViewUI)

Vue.filter('dateFormat', (val, format) => new Date(val).format(format))

Vue.component('modal-footer', ModalFooter)

Vue.prototype.$api = api
