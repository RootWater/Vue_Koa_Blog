<template>
    <div class="head-portrait">
        <Avatar class="avatar"
                :src="resourceSrc"
                :size="size"></Avatar>
    </div>
</template>

<script>
  import loadResource from '@/mixins/loadResource'

  export default {
    name: 'HeadPortrait',
    mixins: [loadResource],
    props: {
      src: {
        String,
        default: 'assets/images/headPortrait1.jpg'
      },
      size: {
        type: [String, Number],
        default: 120
      }
    },
    created () {
      this.loadResource(this.src)
    },
    watch: {
      src: {
        immediate: true,
        handler (val) {
          this.loadResource(val)
        }
      }
    }
  }
</script>

<style scoped
       lang="less">
    @import './HeadPortrait';
</style>
