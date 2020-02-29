<template>
  <div class="load-more">
    <Button @click="loadMore">加载更多</Button>
  </div>
</template>

<script>
  export default {
    name: 'LoadMore',
    props: {
      pageNumber: {
        Number,
        default: 1
      },
      loadFunc: {
        Function,
        default: () => ({})
      }
    },
    methods: {
      loadMore () {
        this.$emit('update:pageNumber', this.pageNumber + 1)
        this.loadFunc()
      }
    }
  }
</script>

<style scoped
       lang="less">
  .load-more {
    text-align: center;
  }
</style>
