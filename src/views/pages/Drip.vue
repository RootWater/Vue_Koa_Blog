<template>
  <div class="drip">
    <div class="artical-box">
      <template v-for="article in articleList.data">
        <Article :key="article.id"
                 :article="article"></Article>
      </template>
    </div>
    <load-more v-if="maxPageNumber > articleList.pageNumber"
               :page-number.sync="articleList.pageNumber"
               :load-func="loadArtsData"></load-more>
  </div>
</template>

<script>
  import Article from '@/views/pages/components/Article'
  import LoadMore from '@/components/loadMore/LoadMore'

  export default {
    name: 'Drip',
    components: {
      LoadMore,
      Article
    },
    data () {
      return {
        articleList: {
          data: [],
          pageNumber: 1,
          pageSize: 15
        },
        maxPageNumber: 1
      }
    },
    created () {
      this.loadArtsData()
    },
    methods: {
      loadArtsData () {
        this.$api.Article.loadArticleData({
          pageNumber: 1,
          pageSize: 10
        })
          .then(({ count, rows }) => {
            this.maxPageNumber = Math.ceil(count / this.articleList.pageSize)
            this.articleList.data = rows
          })
      }
    }
  }
</script>

<style scoped
       lang="less">
  .drip {
    .artical-box {
      margin-left: 5%;
    }
  }
</style>
