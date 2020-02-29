<template>
  <div class="messageBoard">
    <h1 class="title ta-c">
      留言板
    </h1>
    <div class="content">
      <editor ref="editor"
              @on-comment="handleComment"></editor>
      <comment ref="comment"
               @on-reply="handleReply"
               @on-delete="handleDelete"
               @on-load-comment="handleLoadComment"></comment>
    </div>
  </div>
</template>

<script>
  import Editor from '@/views/pages/components/Editor'
  import Comment from '@/views/pages/components/Comment'

  export default {
    name: 'MessageBoard',
    components: {
      Comment,
      Editor
    },
    provide () {
      return {
        selectComment: this.selectComment
      }
    },
    data () {
      return {
        selectComment: {
          pid: '',
          userName: '',
          count: 0
        },
        commentChildrenObj: {}
      }
    },
    methods: {
      handleReply () {
        this.$refs.editor.getFocus()
      },
      handleDelete (comment) {
        this.$api.MessageBoard.delComment({ id: comment.id })
          .then(({ result }) => {
            if (result) {
              this.$Message.success('删除成功')
              setTimeout(() => {
                this.$refs.comment.initCommentRecord()
              }, 0)
            } else {
              this.$Message.error('删除失败')
            }
          })
      },
      handleLoadComment (commentChildrenObj) {
        this.commentChildrenObj = { ...commentChildrenObj }
      },
      handleComment (comment) {
        if (comment.pid) {
          this.commentChildrenObj[comment.pid].push(comment)
        } else {
          setTimeout(() => {
            this.$refs.comment.initCommentRecord()
          }, 0)
        }
      }
    }
  }
</script>

<style scoped
       lang="less">
  .messageBoard {
    .title {
      font-size: 16px;
      font-weight: 400;
    }
  }
</style>
