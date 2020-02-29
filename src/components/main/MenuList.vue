<template>
  <Menu class="menu-list"
        mode="horizontal"
        :active-name="activePage"
        @on-select="handleSelect">
    <template v-for="menu in menuList">
      <MenuItem :key="menu.code"
                :name="menu.path">
        {{menu.text}}
      </MenuItem>
    </template>
  </Menu>
</template>

<script>
  import { createMenuList } from '@/libs/utils'
  import { mapMutations } from 'vuex'
  import { ss } from '@/libs/tools'

  export default {
    name: 'MenuList',
    data () {
      return {
        menuList: createMenuList(),
        activePage: ''
      }
    },
    mounted () {
      this.initActive()
    },
    methods: {
      ...mapMutations(['setCurrentActivePage']),
      handleSelect (name) {
        this.$router.push(name)
      },
      initActive () {
        this.activePage = ss.get('currentActivePage')

        if (!this.activePage) {
          this.activePage = this.menuList[0].path
        }

        this.setCurrentActivePage(this.activePage)
      }
    },
    watch: {
      '$route' (route) {
        this.setCurrentActivePage(route.path)
      },
      activePage (val) {
        this.handleSelect(val)
      }
    }
  }
</script>

<style scoped
       lang="less">
  @import './MenuList';
</style>
