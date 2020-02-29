<template>
  <div class="resume">
    <Card :dis-hover="true"
          class="no-b-l no-b-r">
      <Section title="联系方式">
        <i-col :md="8"
               :xs="24">
          ● 电话：17609246459
        </i-col>
        <i-col :md="8"
               :xs="24">
          ● 邮箱：2468048176@qq.com
        </i-col>
      </Section>
      <Section title="个人信息">
        <i-col :md="8"
               :xs="24">
          ● 雷浩浩 | 男 | 2000.03
        </i-col>
        <i-col :md="8"
               :xs="24">
          ● 前端开发工程师
        </i-col>
      </Section>
      <Section title="教育背景">
        <i-col :md="8"
               :xs="24">
          ● 渭南职业技术学院 | 专科
        </i-col>
        <i-col :md="8"
               :xs="24">
          ● 计算机应用技术
        </i-col>
      </Section>
      <Section title="技术优势">
        <i-col span="24"
               class="m-b-20">
          ● 支持 w3c 规范的前台网页重构,对 DIV+CSS 盒子模型布局有深刻的理解
        </i-col>
        <i-col span="24"
               class="m-b-20">
          ● 熟悉使用 Vue iView BootStrap 等前端框架
        </i-col>
        <i-col span="24"
               class="m-b-20">
          ● 熟练掌握 CSS3 ES6 webpack 模块化 组件化开发 ...
        </i-col>
        <i-col span="24"
               class="m-b-20">
          ● 了解并使用 移动端HTML5开发 微信小程序开发 Electron开发
        </i-col>
        <i-col span="24"
               class="m-b-20">
          ● 可以写点NodeJs
        </i-col>
        <i-col span="24"
               class="m-b-20">
          ● 具有良好的编码规范与业务沟通能力
        </i-col>
        <i-col span="24">
          ● 独立解决问题、细节掌握、工作负责、自主补充知识
        </i-col>
      </Section>
      <Section title="开源项目">
        <i-col span="24"
               class="m-b-20">
          ● <span style="color: red;">待填</span>
        </i-col>
        <i-col span="24"
               class="m-b-20">
          ● <span style="color: red;">待填</span>
        </i-col>
        <i-col span="24">
          ● <span style="color: red;">待填</span>
        </i-col>
      </Section>
      <Section title="工作经历">
        <i-col span="24"
               class="m-b-20">
          ● 上海才匠智能科技有限公司（2019年7月 ~ 2020年4月）
        </i-col>
        <i-col span="24"
               class="m-b-20 f-w-900">
          企业管理系统
        </i-col>
        <i-col span="24">
          负责公司 MES 系统 PC\移动端 开发。根据业务需求构建页面框架，利用 Vue\ES6\CSS3 书写前端页面，处理业务逻辑并进行数据展示，让用户操作更便捷，更高效。
        </i-col>
      </Section>
    </Card>
  </div>
</template>

<script>
  import Section from '@/views/pages/components/Section'

  export default {
    name: 'Resume',
    components: { Section }
  }
</script>

<style scoped>

</style>
