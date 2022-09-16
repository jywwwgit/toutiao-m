<template>
  <div class='like-article'>
    <van-icon
      :loading="loading"
      :name="value === 1 ? 'good-job' : 'good-job-o'"
      :color="value === 1 ? '#e5645f' : ''"
      @click="onClick"
    />
  </div>
</template>

<script>
import { addLike, delLike } from '@/api/article'
export default {
  name: 'LikeArticle',
  components: {},
  props: {
    value: {
      type: Number,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      loading: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onClick () {
      this.loading = true
      try {
        let status = -1
        if (this.value === 1) {
          // 文章已点赞，取消点赞
          await addLike(this.articleId)
        } else {
          // 文章未点赞，添加点赞
          await delLike(this.articleId)
          status = 1
        }
        // 更新视图
        this.$emit('input', status)
        this.$toast.success(status === 1 ? '点赞成功' : '取消点赞')
      } catch (err) {
        this.$toast.fail('获取数据失败，请稍后重试')
      }
      this.loading = false
    }
  }
}
</script>

<style scoped lang='less'>

</style>
