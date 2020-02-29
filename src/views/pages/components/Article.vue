<template>
  <div class="article">
    <div class="dotts"></div>
    <a class="date-wrapper"
       @click.stop="turnTo">
      <span class="date">{{article.createdOn | dateFormat('yyyy-MM-dd')}}</span>
    </a>
    <div class="art-container">
      <div class="line"></div>
      <div class="art-content">
        <div class="art-content-title"
             @click.stop="turnTo">
          {{article.title}}
        </div>
        <div v-if="article.imgSrc"
             class="art-content-img">
          <img :src="article.imgSrc | srcFormat"
               :alt="article.imgName">
        </div>
        <div class="art-content-desc">
          {{article.desc}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Article',
    props: {
      article: {
        Object,
        default: () => ({})
      }
    },
    filters: {
      srcFormat: function (val) {
        if (process.env.NODE_ENV === 'development') {
          const baseUrl = process.env.VUE_APP_API
          return baseUrl.replace(/\/koa/g, '') + val
        }
        return val
      }
    },
    methods: {
      turnTo () {
        this.$router.push({
          name: 'artDetail',
          params: {
            id: this.article.id
          }
        })
      }
    }
  }
</script>

<style scoped
       lang="less">
  .article {
    position: relative;
    width: 100%;
    min-height: .3rem;

    .dotts {
      position: absolute;
      z-index: 10;
      width: 1.2em;
      height: 1.2em;
      border: .143em solid #f7f3ee;
      border-radius: 50%;
      margin-left: -.5em;
      background: #fff;
    }

    .date-wrapper {
      position: absolute;
      z-index: 100;
      left: 3.5em;
      color: #948c76;
      transition: all .3s;

      &:before,
      .date {
        position: absolute;
        top: -.05rem;
      }

      &:before {
        content: '';
        left: -.2rem;
        width: 0;
        height: 0;
        border-right: 16px solid #f7f3ee;
        border-top: 15px solid transparent;
        border-bottom: 15px solid transparent;
        transform: rotate(0deg);
      }

      .date {
        left: -.04rem;
        padding: 0 .1em;
        width: .7rem;
        height: 30px;
        line-height: 30px;
        font-size: .8em;
        background: #f7f3ee;
      }

      &:hover {
        left: .3rem;

        &:before {
          border-right-color: #e7d9ba;
        }

        .date {
          background: #e7d9ba;
        }
      }
    }

    .art-container {
      position: relative;
      width: 100%;

      .line {
        position: absolute;
        z-index: 0;
        width: .143em;
        height: 100%;
        background: #f7f3ee;
        transition: all .5s;
      }

      .art-content {
        padding: 0 1em 1em 1.5em;
        overflow: hidden;

        &-title {
          margin: 3em 0 2em;
          font-size: 1em;
          cursor: pointer;

          &:hover {
            text-decoration: underline;
          }
        }

        &-img {
          width: 60%;

          img {
            width: 100%;
          }
        }

        &-desc {
          font-size: .8em;
        }
      }
    }
  }
</style>
