<template>
  <div class="main-comment">
    <div class="comment-num">
      第 {{comment.count}} 楼
    </div>
    <comment-con :comment="comment"
                 @on-reply="handleReply"
                 @on-delete="handleDelete"></comment-con>
    <slot></slot>
    <Divider/>
  </div>
</template>

<script>
  import CommentCon from '@/views/pages/components/CommentCon'

  export default {
    name: 'MainComment',
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

<style scoped>

</style>
