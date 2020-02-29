import { checkTools } from '@/libs/tools'

export default {
  data () {
    return {
      resourceSrc: ''
    }
  },
  methods: {
    loadResource (path = '', callback) {
      const resource = require(`@/${path}`)

      callback && checkTools.isFunction(callback) && callback(resource)

      this.resourceSrc = resource
    }
  }
}
