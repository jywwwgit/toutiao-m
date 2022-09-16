<template>
  <div class='comment-list'>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="加载失败，请点击重试"
      :immediate-check="false"
    >
      <CommentItem
        v-for="(item, index) in list"
        :key="index "
        :comment="item"
        @reply-click="$emit('reply-click', $event)"
      />
    </van-list>
  </div>
</template>

<script>
import { getComments } from '@/api/comment'
import CommentItem from '@/views/article/comments/comment-item.vue'
export default {
  name: 'CommentList',
  components: {
    CommentItem
  },
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    },
    list: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      // 自定义 prop 数据验证
      validater (value) {
        return ['a', 'c'].includes(value)
      },
      default: 'a'
    }
  },
  data () {
    return {
      localList: this.list,
      loading: false,
      finished: false,
      offset: null,
      limit: 10,
      error: false
    }
  },
  computed: {},
  watch: {},
  created () {
    // 手动初始化onLoad时，不会自动开始初始的loading，所以我们要手动开启
    this.loading = true
    // 页面未渲染就加载一次数据
    this.onLoad()
  },
  mounted () {},
  methods: {
    async onLoad () {
      // 1.请求获取数据
      try {
        const { data } = await getComments({
          type: this.type,
          source: this.source.toString(),
          offset: this.offset,
          limit: this.limit
        })
        // if (Math.random() > 0.2) {
        //   JSON.parse('sddasdas')
        // }
        // 2.将数据添加到列表中
        const { results } = data.data
        this.localList.push(...results)
        // 把文章评论列表传递给外部
        this.$emit('load-success', data.data)

        // 3.将loading设置为false
        this.loading = false
        // 4.判断是否还有数据
        if (results.length) {
          this.offset = data.data.last_id
        } else {
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang='less'>

</style>
