<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      title="个人信息"
      left-arrow
      right-text="保存"
      @click-left="$router.back()"
    />
    <!-- 个人信息 -->
    <van-cell-group>
      <van-cell
        title="头像"
        is-link
        @click="$refs.file.click()"
      >
        <van-image
          round
          width="30"
          height="30"
          fit="cover"
          :src="user.photo"
        />
      </van-cell>
      <van-cell
        title="昵称"
        :value="user.name"
        is-link
        @click="isUpdateNameShow = true"
      />
      <van-cell
        title="性别"
        :value="user.gender === 0 ? '男' : '女'"
        is-link
        @click="isUpdateGenderShow = true"
      />
      <van-cell
        title="生日"
        :value="user.birthday"
        is-link
        @click="isUpdateBirthdayShow = true"
      />
    </van-cell-group>

    <!-- 头像弹出层 -->
    <input
      type="file"
      hidden
      ref="file"
      @change="onFileChange"
    >
    <van-popup
      v-model="isUpdatePhotoShow"
      :style="{ height: '100%', width: '100%' }"
      position="bottom"
    >
     <update-photo
      v-if="isUpdatePhotoShow"
      :img="img"
      @close="isUpdatePhotoShow = false"
      @update-photo="user.photo = $event"
     />
    </van-popup>
    <!-- 头像弹出层 -->

    <!-- 昵称弹出层 -->
    <van-popup
      v-model="isUpdateNameShow"
      :style="{ height: '100%', width: '100%' }"
      position="bottom"
    >
      <update-name
        v-if="isUpdateNameShow"
        v-model="user.name"
        @close="isUpdateNameShow = false"
      />
    </van-popup>

    <!-- 性别弹出层 -->
    <van-popup
      v-model="isUpdateGenderShow"
      position="bottom"
    >
    <update-genter
      v-if="isUpdateGenderShow"
      v-model="user.gender"
      @close="isUpdateGenderShow = false"
    />
    </van-popup>
    <!-- 性别弹出层 -->

    <!-- 编辑生日 -->
    <van-popup
      v-model="isUpdateBirthdayShow"
      position="bottom"
    >
      <update-birthday
        v-if="isUpdateBirthdayShow"
        v-model="user.birthday"
        @close="isUpdateBirthdayShow = false"
      />
    </van-popup>
    <!-- /编辑生日 -->
  </div>
</template>

<script>
import { editUser } from '@/api/user'
import UpdateName from './components/update-name.vue'
import UpdateGenter from './components/update-gender.vue'
import UpdateBirthday from './components/update-birthday.vue'
import UpdatePhoto from './components/update-photo.vue'
export default {
  name: 'UserProfile',
  components: {
    UpdateName,
    UpdateGenter,
    UpdateBirthday,
    UpdatePhoto
  },
  data () {
    return {
      user: {},
      isUpdatePhotoShow: false, // 头像弹出层
      isUpdateNameShow: false, // 昵称弹出层开关
      isUpdateGenderShow: false, // 性别弹出层
      isUpdateBirthdayShow: false, // 生日弹出层
      img: null
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
    },

    onFileChange () {
      // 获取文件对象
      const file = this.$refs.file.files[0]
      // 基于文件对象获取blog数据
      this.img = window.URL.createObjectURL(file)
      this.isUpdatePhotoShow = true
      this.$refs.file.value = ''
    }
  }
}
</script>

<style scoped lang="less">
  .van-popup {
    background-color: #f5f7f9;
  }
</style>
