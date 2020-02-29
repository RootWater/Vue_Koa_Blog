<template>
  <Layout class="main">
    <Header class="main-header">
      <head-portrait></head-portrait>
      <text-show></text-show>
      <menu-list class="no-print"></menu-list>
    </Header>
    <Content class="main-content">
      <transition name="fadein-go-top">
        <go-top class="no-print"></go-top>
      </transition>
      <music class="no-print"></music>
      <router-view v-if="noCache"></router-view>
      <keep-alive v-else>
        <router-view/>
      </keep-alive>
    </Content>
    <!--<Footer class="main-footer">

    </Footer>-->
  </Layout>
</template>

<script>
  import HeadPortrait from '@/components/main/HeadPortrait'
  import TextShow from '@/components/main/TextShow'
  import MenuList from '@/components/main/MenuList'
  import GoTop from '@/components/goTop'
  import Music from '@/components/music'
  import { ss } from '@/libs/tools'

  export default {
    name: 'Main',
    components: {
      Music,
      GoTop,
      MenuList,
      TextShow,
      HeadPortrait
    },
    data () {
      return {
        user: ''
      }
    },
    created () {
      this.init()
    },
    computed: {
      noCache () {
        return this.$route.meta && this.$route.meta.noCache
      }
    },
    methods: {
      init () {
        const isLogin = ss.get('isLogin', 'bool')

        if (isLogin) {
          this.$store.commit('setUser', ss.get('user') || {})
        }
      }
    }
  }
</script>

<style lang="less">
  @import './Main';
</style>
