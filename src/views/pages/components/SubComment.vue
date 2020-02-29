<template>
  <div class="sub-comment">
    <comment-con :comment="comment"
                 @on-reply="handleReply"
                 @on-delete="handleDelete"></comment-con>
    <slot></slot>
  </div>
</template>

<script>
  import CommentCon from '@/views/pages/components/CommentCon'

  export default {
    name: 'SubComment',
    components: { CommentCon },
    props: {
      comment: {
        Object,
        default: () => ({})
      }
    },
    methods: {
      handleReply () {
        this.$emit('on-reply')
      },
      handleDelete (comment) {
        this.$emit('on-delete', comment)
      }
    }
  }
</script>

<style scoped
       lang="less">
  .sub-comment {
    margin-left: 44px;
  }
</style>
