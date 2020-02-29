<template>
  <section class="section">
    <slot name="title"
          v-if="showTitle">
      <h1 class="title f-s-18 f-w-900 m-b-20">{{title}}</h1>
    </slot>
    <Row class="box bg-gray-lightest m-b-20">
      <slot></slot>
    </Row>
  </section>
</template>

<script>
  export default {
    name: 'Section',
    props: {
      title: String
    },
    computed: {
      showTitle () {
        return this.title || this.$slots.title
      }
    }
  }
</script>

<style scoped
       lang="less">
  .section {
    .title {
      margin-left: -15px;
      padding-left: 15px;
      border-left: 5px solid #6098f9;
    }

    .box {
      padding: 10px 15px;
      border-radius: 5px;
    }
  }
</style>
