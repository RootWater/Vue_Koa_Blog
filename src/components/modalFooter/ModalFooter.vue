<template>
  <div class="modal-footer-con">
    <Button :icon="getCancelProperty('Icon')"
            :type="getCancelProperty('Type')"
            @click="handleCancelClick">
      {{getCancelProperty('Text')}}
    </Button>
    <Button :icon="getConfirmProperty('Icon')"
            :type="getConfirmProperty('Type')"
            @click="handleConfirmClick">
      {{getConfirmProperty('Text')}}
    </Button>
  </div>
</template>

<script>
  import { isEmptyObject } from '@/libs/tools'

  export default {
    name: 'ModalFooter',
    props: {
      cancelOptions: {
        Object,
        default: () => ({})
      },
      confirmOptions: {
        Object,
        default: () => ({})
      },
      cancelType: String,
      confirmType: {
        String,
        default: 'primary'
      },
      cancelText: {
        String,
        default: '取消'
      },
      confirmText: {
        String,
        default: '确定'
      },
      cancelIcon: String,
      confirmIcon: String,
      show: {
        Boolean,
        default: false
      }
    },
    methods: {
      hasOptions (type) {
        return !isEmptyObject(this[type])
      },
      getCancelProperty (key) {
        return this.hasOptions('cancelOptions') ? this.cancelOptions[key.toLowerCase()] : this[`cancel${key}`]
      },
      getConfirmProperty (key) {
        return this.hasOptions('confirmOptions') ? this.confirmOptions[key.toLowerCase()] : this[`confirm${key}`]
      },
      handleCancelClick () {
        this.$emit('update:show', false)
        this.$emit('on-cancel')
      },
      handleConfirmClick () {
        this.$emit('on-confirm')
      }
    }
  }
</script>

<style scoped>

</style>
