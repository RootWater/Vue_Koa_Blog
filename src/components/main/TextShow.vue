<template>
    <div class="text-show">
        <p :style="{fontSize: size, fontWeight, color, background}">{{text}}</p>
    </div>
</template>

<script>
  export default {
    name: 'TextShow',
    props: {
      text: {
        String,
        default: 'Mr.L'
      },
      size: {
        String,
        default: '1.3em'
      },
      fontWeight: {
        type: [String, Number],
        default: 400
      },
      color: {
        String,
        default: '#948c76'
      },
      background: {
        String,
        default: '#f7f3ee'
      }
    }
  }
</script>

<style scoped
       lang="less">
    @import './TextShow';
</style>
