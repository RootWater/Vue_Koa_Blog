<template>
  <div class="comment">
    <template v-for="(comment, index) in commentList">
      <main-comment :key="`main_comment_${index}`"
                    :comment="comment"
                    @on-reply="handleReply"
                    @on-delete="handleDelete">
        <template v-if="comment.children && comment.children.length > 0">
          <re-comment :comment-list="comment.children"
                      :parent-index="index"
                      @on-reply="handleReply"
                      @on-delete="handleDelete"></re-comment>
        </template>
      </main-comment>
    </template>
    <load-more v-if="maxPageNumber > commentParams.pageNumber"
               :page-number.sync="commentParams.pageNumber"
               :load-func="loadCommentRecord"></load-more>
  </div>
</template>

<script>
  import MainComment from '@/views/pages/components/MainComment'
  import ReComment from '@/views/pages/components/ReComment'
  import { createCommentList } from '@/libs/utils'
  import LoadMore from '@/components/loadMore/LoadMore'

  const createCommentParams = () => ({
    pageNumber: 1,
    pageSize: 15
  })

  export default {
    name: 'Comment',
    components: {
      LoadMore,
      ReComment,
      MainComment
    },
    data () {
      return {
        commentParams: createCommentParams(),
        maxPageNumber: 1,
        commentList: []
      }
    },
    mounted () {
      this.loadCommentRecord()
    },
    methods: {
      handleReply () {
        this.$emit('on-reply')
      },
      handleDelete (comment) {
        this.$emit('on-delete', comment)
      },
      loadCommentRecord () {
        this.$api.MessageBoard.loadComment(this.commentParams)
          .then(({ count, rows }) => {
            this.maxPageNumber = Math.ceil(count / this.commentParams.pageSize)

            const { commentList, commentChildrenObj } = createCommentList(rows)
            this.commentList.push(...commentList)

            this.$emit('on-load-comment', commentChildrenObj)
          })
      },
      initCommentRecord () {
        this.commentParams = createCommentParams()
        this.commentList = []

        this.loadCommentRecord()
      }
    }
  }
</script>

<style scoped
       lang="less">
  .comment {
    padding: 0 1em;
    margin: 1em 0;
  }
</style>
