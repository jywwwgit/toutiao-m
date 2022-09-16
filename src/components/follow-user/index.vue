<template>
  <div class='follow-user'>
    <van-button
      v-if="isFollowed"
      class="follow-btn"
      round
      size="small"
      :loading="loading"
      @click="onFollow"
    >已关注</van-button>
    <van-button
      v-else
      class="follow-btn"
      type="info"
      color="#3296fa"
      round
      size="small"
      icon="plus"
      :loading="loading"
      @click="onFollow"
    >关注</van-button>
  </div>
</template>

<script>
import { addFollow, deleteFollow } from '@/api/user'
export default {
  name: 'FollowUser',
  components: {},
  model: {
    prop: 'isFollowed',
    event: 'update-is_followed'
  },
  props: {
    isFollowed: {
      type: Boolean,
      required: true
    },
    userId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      loading: false
      // localIsFollowed: this.isFollowed
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onFollow () {
      this.loading = true // 展示关注按钮的loading状态
      try {
        if (this.value) {
          // 已关注，取消关注
          await deleteFollow(this.userId)
        } else {
          // 添加关注
          await addFollow(this.userId)
        }
        // 跟新视图状态
        // this.localIsFollowed = !this.localIsFollowed
        this.$emit('update-is_followed', !this.isFollowed)
      } catch (err) {
        console.log(err)
        let message = '操作失败，请重试'
        if (err.response && err.response.status === 400) {
          message = '你不能关注你自己'
        }
        this.$toast(message)
      }
      this.loading = false // 关闭关注按钮的loading状态
    }
  }
}
</script>

<style scoped lang='less'>

</style>
