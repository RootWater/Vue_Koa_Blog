<template>
  <div class="login">
    <Form ref="loginForm"
          label-position="right"
          :label-width="60"
          :model="form"
          :rules="formRules"
          :label-colon="true">
      <FormItem label="名称"
                prop="name">
        <Input v-model.trim="form.name"
               placeholder="请填写名称">
          <Icon v-show="formValidate.name"
                slot="suffix"
                type="md-checkmark-circle"
                color="#52c41a"/>
        </Input>
      </FormItem>
      <FormItem label="邮箱"
                prop="email">
        <Input v-model.trim="form.email"
               placeholder="请填写邮箱">
          <Icon v-show="formValidate.email"
                slot="suffix"
                type="md-checkmark-circle"
                color="#52c41a"/>
        </Input>
      </FormItem>
    </Form>
  </div>
</template>

<script>
  const createForm = () => ({
    name: '',
    email: '',
    loginTime: new Date().format('yyyy-MM-dd hh:mm:ss')
  })

  const createFormValidate = () => ({
    name: false,
    email: false
  })

  export default {
    name: 'Login',
    props: {
      show: {
        Boolean,
        default: false
      }
    },
    data () {
      const vm = this

      const validate1 = (rule, value, callback) => {
        let err = ''

        vm.$refs.loginForm.validateField('name', message => {
          err = message
        })

        if (err) {
          vm.formValidate.name = false
          callback(new Error(err))
        } else {
          vm.formValidate.name = true
          callback()
        }
      }
      const validate2 = (rule, value, callback) => {
        let err = ''

        vm.$refs.loginForm.validateField('email', message => {
          err = message
        })

        if (err) {
          vm.formValidate.email = false
          callback(new Error(err))
        } else {
          vm.formValidate.email = true
          callback()
        }
      }

      return {
        form: createForm(),
        formValidate: createFormValidate(),
        formRules: {
          name: [{
            required: true,
            trigger: 'blur',
            message: '昵称必填'
          }, {
            validator: validate1,
            trigger: 'blur'
          }],
          email: [{
            required: true,
            trigger: 'blur',
            message: '邮箱必填'
          }, {
            type: 'email',
            message: '邮箱格式不正确，格式为：xx@xx.com',
            trigger: 'change'
          }, {
            validator: validate2,
            trigger: 'blur'
          }]
        }
      }
    },
    methods: {
      init () {
        this.form = createForm()
        this.formValidate = createFormValidate()
      },
      validate () {
        return new Promise(resolve => {
          this.$refs.loginForm.validate()
            .then(valid => {
              resolve({
                valid,
                data: this.form
              })
            })
        })
      }
    },
    watch: {
      show (val) {
        if (val) {
          this.init()
        }
      }
    }
  }
</script>

<style scoped>

</style>
