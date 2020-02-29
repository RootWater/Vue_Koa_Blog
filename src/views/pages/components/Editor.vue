<template>
  <div class="editor">
    <div ref="suctionTop"
         class="editor-wrapper"
         :class="{suctionTop: isSuctionTop}">
      <div class="editor-wrapper-toolbar">
        <div class="editor-wrapper-toolbar-l">
          <Icon type="md-flash"
                color="#2d8cf0"
                size="18"/>
          <span>{{user.name || '请先登录'}}</span>
        </div>
        <div class="editor-wrapper-toolbar-r">
          <template v-if="isLogin">
            <a class="btn loginOut"
               @click.stop="handleLoginOut">退出</a>
            <a class="btn"
               @click.stop="handleComment">发布</a>
          </template>
          <template v-else>
            <a class="btn"
               @click.stop="() => {modal.showLogin = true;}">登录</a>
          </template>
        </div>
      </div>
      <div class="editor-wrapper-text-area">
        <template>
          <Tag v-show="hasReply"
               ref="tag"
               class="editor-wrapper-text-area-tag"
               type="border"
               color="blue"
               :closable="true"
               @on-close="handleCloseTag">
            @{{selectComment.userName}}
          </Tag>
        </template>
        <Input ref="editorInput"
               type="textarea"
               placeholder="说点什么吧..."
               v-model="comment.content"
               :rows="5"
               :spellcheck="true"
               :show-word-limit="true"
               :maxlength="500"
               :autosize="{minRows: 5, maxRows: 5}"
               @on-change="handleContentChange"/>
      </div>
    </div>
    <div v-if="isSuctionTop"
         :style="{height: `${suctionTopHeight}px`}"></div>
    <Modal v-model="modal.showLogin"
           title="登录"
           width="25">
      <login ref="login"
             :show="modal.showLogin"></login>
      <modal-footer slot="footer"
                    confirm-text="登录"
                    :show.sync="modal.showLogin"
                    @on-confirm="handleLogin"></modal-footer>
    </Modal>
  </div>
</template>

<script>
  import Login from '@/views/pages/components/Login'
  import { isEmptyObject } from '@/libs/tools'

  const createComment = () => ({
    content: ''
  })

  export default {
    name: 'Editor',
    components: { Login },
    inject: ['selectComment'],
    data () {
      return {
        user: {},
        isLogin: false,
        comment: createComment(),
        modal: {
          showLogin: false
        },
        isSuctionTop: false,
        suctionTopPos: 0,
        suctionTopHeight: 0
      }
    },
    mounted () {
      this.init()
    },
    computed: {
      hasReply () {
        return this.selectComment.count && this.selectComment.pid
      }
    },
    methods: {
      handleContentChange () {
        if (this.hasReply) {
          if (!this.comment.content || !this.comment.content.startsWith('\n')) {
            this.comment.content = '\n' + this.comment.content
          }
        }
      },
      handleCloseTag () {
        const selectComment = this.selectComment
        selectComment.count = 0
        selectComment.pid = ''
      },
      handleLoginOut () {
        this.$store.commit('loginOut')
        this.user = {}
        this.isLogin = false
      },
      handleComment () {
        if (isEmptyObject(this.user)) {
          this.$Message.warning('请先登录再发布')
        } else if (!this.comment.content) {
          this.$Message.warning('请多评论一点')
        } else {
          this.execComment()
        }
      },
      getFocus () {
        this.$refs.editorInput.focus()
      },
      execComment () {
        const content = this.comment.content
        const selectComment = { content, ...this.selectComment }
        selectComment.content = this.hasReply ? content.replace(/^\n+/, '') : content

        delete selectComment.userName

        this.$api.MessageBoard.comment({
          user: this.user.id, ...selectComment
        })
          .then(({ result }) => {
            if (result) {
              this.$Message.success('发布成功')

              this.comment = createComment()

              this.handleCloseTag()
              this.$emit('on-comment', result)
            } else {
              this.$Message.error('发布失败')
            }
          })
      },
      handleLogin () {
        this.$refs.login.validate()
          .then(({ valid, data }) => {
            if (valid) {
              this.login(data)
            }
          })
      },
      login (data) {
        this.$api.MessageBoard.checkUser(data)
          .then(({ user }) => {
            if (user) {
              this.user = user
              this.isLogin = true
              this.modal.showLogin = false
              this.$Message.success('登陆成功')
              this.$store.commit('setUser', user)
            } else {
              this.$Message.error('用户名与邮箱不匹配')
            }
          })
      },
      init () {
        const el = this.$refs.suctionTop

        if (el) {
          this.suctionTopHeight = el.offsetHeight
          this.suctionTopPos = el.getBoundingClientRect().y
          document.addEventListener('scroll', this.suctionTop)
        }

        this.user = this.$store.state.app.user || {}
        this.isLogin = this.$store.state.app.isLogin || false
      },
      suctionTop () {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        this.isSuctionTop = scrollTop >= this.suctionTopPos
      }
    },
    watch: {
      'selectComment.pid' (val) {
        this.comment.content = val ? '\n' : ''
      }
    }
  }
</script>

<style scoped
       lang="less">
  .editor {
    padding: 0;
    margin: 2em auto 1em;

    &-wrapper {
      max-width: 800px;
      width: 100%;
      border: 1px solid #ccc;
      border-radius: 5px;
      background: #f7f3ee;

      &:focus {
        border-color: lightblue;
      }

      &-toolbar {
        position: relative;
        height: 40px;
        line-height: 40px;
        padding: 0 5px;

        &-l, &-r {
          position: absolute;
        }

        &-r {
          right: 15px;

          .btn {
            color: inherit;
            cursor: pointer;

            &.loginOut {
              margin-right: 5px;
            }

            &:hover {
              text-decoration: underline;
            }
          }
        }
      }

      &-text-area {
        position: relative;

        &-tag {
          z-index: 1000;
          position: absolute;
          margin-left: 7px;
        }
      }
    }
  }
</style>
