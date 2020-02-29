<template>
  <div class="comment-con">
    <div class="comment-avatar">
      <Avatar icon="md-camera"
              style="background-color: #87d068; cursor: pointer;"/>
    </div>
    <div class="comment-info">
      <div class="comment-info-author">
        <span class="comment-info-author-name">
          {{comment.userName}}
        </span>
        <span class="comment-info-author-time">
          <Tooltip placement="top"
                   :content="comment.createdOn | dateFormat('yyyy-MM-dd hh:mm:ss')">
            {{getDays(comment.createdOn)}}
          </Tooltip>
        </span>
      </div>
      <div class="comment-info-content">
        {{comment.content}}
      </div>
      <div class="comment-info-actions">
        <a class="comment-info-actions-reply"
           @click.stop="handleReply">回复</a>
        <Poptip v-if="canDelete"
                confirm
                title="您确认删除这条评论吗？"
                @on-ok="handleDelete">
          <a class="comment-info-actions-delete">删除</a>
        </Poptip>
      </div>
    </div>
  </div>
</template>

<script>
  import { getDays } from '@/libs/utils'

  export default {
    name: 'CommentCon',
    inject: ['selectComment'],
    props: {
      comment: {
        Object,
        default: () => ({})
      }
    },
    computed: {
      canDelete () {
        return this.comment.user === this.$store.state.app.user.id
      }
    },
    methods: {
      getDays,
      handleReply () {
        const { count, userName, id } = this.comment
        this.selectComment.count = count
        this.selectComment.userName = userName
        this.selectComment.pid = id

        this.$emit('on-reply')
      },
      handleDelete () {
        this.$emit('on-delete', this.comment)
      }
    }
  }
</script>

<style lang="less">
  .comment-con {
    .ivu-poptip-confirm {
      .ivu-poptip-inner {
        white-space: nowrap !important;

        .ivu-poptip-body .ivu-icon {
          left: 15px !important;
        }
      }
    }
  }
</style>

<style scoped
       lang="less">
  .comment-con {
    display: flex;
    padding: 16px 0;

    .comment-avatar, .comment-info {
      position: relative;
    }

    .comment-avatar {
      flex: 0;
      min-width: 32px;
      margin-right: 12px;
    }

    .comment-info {
      flex: 1 1 auto;
      min-width: 1px;
      font-size: .14rem;
      word-wrap: break-word;

      &-author {
        display: flex;
        font-size: .14rem;
        margin-bottom: 4px;

        span {
          height: 18px;
          line-height: 18px;
          font-size: .12rem;
          padding-right: 8px;
          color: #ccc;
        }

        &-name {
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }

      &-actions {
        font-size: .12rem;
        text-align: right;

        &-reply,
        &-delete {
          display: inline-block;
          margin: 1em 0;
          color: inherit;

          &:hover {
            color: #ccc;
          }
        }

        &-delete {
          margin-left: .1rem;
          color: red;

          &:hover {
            color: #ff9898;
          }
        }
      }
    }
  }
</style>
