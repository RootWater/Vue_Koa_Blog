<template>
  <div class="art-detail">
    <h1>{{article.title}}</h1>
    <div>
      {{article.desc}}
    </div>
    <div v-html="article.content"></div>
    <div class="art-date">
      {{article.createdOn | dateFormat('yyyy-MM-dd')}}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ArtDetail',
    data () {
      return {
        article: {},
        search: {}
      }
    },
    mounted () {
      this.initData()
    },
    methods: {
      initData () {
        const { params = {} } = this.$route
        this.search = params

        this.loadArticleById()
      },
      loadArticleById () {
        this.$api.Article.loadArticleById(this.search)
          .then(({ result }) => {
            if (result) {
              this.article = result
            } else {
              this.$Message.error('未查出文章信息，请重试')
            }
          })
      }
    }
  }
</script>

<style lang="less">
  .art-detail {
    max-width: 1024px;
    width: 100%;
    padding: 0 1.5em;
    margin: 0 auto;

    * {
      margin-bottom: 2em;
    }

    h1 {
      font-size: 1em;
      font-weight: 400;
      color: #000;
      text-align: center;
    }

    div,
    p {
      font-size: 1em;
    }

    pre {
      display: block;
      padding: 10px;
      margin: 0 0 10px;
      font-size: 13px;
      line-height: 1.5em;
      color: #333;
      border: 1px solid #ccc;
      border-radius: 5px;
      background-color: #f5f5f5;
      white-space: pre-wrap;
    }

    .art-date {
      margin: 2em 0 5em;
      font-size: .8em;
      color: #948c76;
    }
  }
</style>
