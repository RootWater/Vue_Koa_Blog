<template>
  <div class="go-top"
       @click.stop="backTop"
       :style="{opacity}">
    <Icon type="ios-arrow-up"
          :size="size"
          :color="color"/>
  </div>
</template>

<script>
  export default {
    name: 'GoTop',
    props: {
      size: {
        type: [Number, String],
        default: 45
      },
      color: {
        String,
        default: '#fff'
      },
      speed: {
        Number,
        default: 5
      }
    },
    data () {
      return {
        scrollTop: 0,
        opacity: 0
      }
    },
    created () {
      window.addEventListener('scroll', this.calcScrollTop)
    },
    destroyed () {
      window.removeEventListener('scroll', this.calcScrollTop)
    },
    methods: {
      backTop () {
        const timer = setInterval(() => {
          const isSpeed = Math.floor(-this.scrollTop / this.speed)

          window.scrollTo(0, this.scrollTop + isSpeed)

          if (this.scrollTop === 0) {
            clearInterval(timer)
          }
        }, 10)
      },
      calcScrollTop () {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        this.scrollTop = scrollTop

        if (scrollTop > 100) {
          this.opacity = 1
        } else {
          this.opacity = 0
        }
      }
    }
  }
</script>

<style lang="less">
  @import 'GoTop';
</style>
