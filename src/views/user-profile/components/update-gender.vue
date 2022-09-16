<template>
  <div class='update-gender'>
    <van-picker
      title="标题"
      show-toolbar
      :default-index="this.value"
      :columns="columns"
      @confirm="onConfirmSave"
      @cancel="$emit('close')"
      @change="onPickerChange"
    />
  </div>
</template>

<script>
import { updateUser } from '@/api/user'
export default {
  name: 'UpdateGenter',
  components: {},
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      columns: ['男', '女'],
      localGender: this.value
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onConfirmSave () {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true, // 禁止背景点击
        duration: 0 // 持续展示
      })
      try {
        // 性别修改接口跨域，待处理
        await updateUser({
          gender: this.localGender
        })
        // 更新视图
        this.$emit('input', this.localGender)
        // 关闭弹层
        this.$emit('close')
        // 提示成功
        this.$toast.success('更新成功')
      } catch (err) {
        this.$toast.fail('更新失败')
      }
    },

    onPickerChange (picker, value, index) {
      this.localGender = index
    }
  }
}
</script>

<style scoped lang='less'>

</style>
