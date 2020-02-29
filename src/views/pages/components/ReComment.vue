<template>
  <div class="re-comment">
    <template v-for="(commentItem, index) in commentList">
      <sub-comment :key="`sub_comment_${parentIndex + index}`"
                   :comment="commentItem"
                   @on-reply="handleReply"
                   @on-delete="handleDelete">
        <template v-if="commentItem.children && commentItem.children.length > 0">
          <re-comment :comment-list="commentItem.children"
                      :index="parentIndex + index"
                      @on-reply="handleReply"
                      @on-delete="handleDelete"></re-comment>
        </template>
      </sub-comment>
    </template>
  </div>
</template>

<script>
  import SubComment from '@/views/pages/components/SubComment'

  export default {
    name: 'ReComment',
    components: { SubComment },
    props: {
      commentList: {
        Object,
        default: () => ({})
      },
      parentIndex: Number
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
