<template>
  <div>
    <van-nav-bar
      title="个人信息"
      left-arrow
      right-text="保存"
      @click-left="$router.back()"
    />
    <van-cell-group>
      <van-cell title="头像" is-link>
        <van-image
          round
          width="30"
          height="30"
          fit="cover"
          :src="user.photo"
        />
      </van-cell>
      <van-cell title="昵称" :value="user.name" is-link />
      <van-cell title="性别" :value="user.gender === 0 ? '男' : '女'" is-link />
      <van-cell title="生日" :value="user.birthday" is-link />
    </van-cell-group>
  </div>
</template>

<script>
import { editUser } from '@/api/user'
export default {
  name: 'UserIndex',
  components: {},
  data () {
    return {
      user: {}
    }
  },
  computed: {},
  created () {
    this.loadEditUser()
  },
  methods: {
    async loadEditUser () {
      try {
        const { data } = await editUser()
        this.user = data.data
      } catch (err) {
        this.$toast('请求失败，请重试')
      }
    }
  }
}
</script>
