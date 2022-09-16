<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isFreshLoading"
      @refresh="onRefresh"
      :success-text="refreshSuccessText"
      :success-duration="1500"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败,点击重新加载"
        @load="onLoad"
        >
        <article-item
          v-for="(article,index) in list"
          :key="index"
          :article="article"
        />
        <!-- <van-cell
          v-for="(article,index) in list"
          :key="index"
          :title="article.title"
        /> -->
      </van-list>
    </van-pull-refresh>
   </div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item/index.vue'
export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [], // 存储列表数据的数组
      loading: false, // 控制加载中 loading 的状态
      finished: false, // 控制数据加载结束的状态
      error: false, // 是否加载失败
      timestamp: null, // 请求下一页数据的时间戳
      isFreshLoading: false, // 控制下拉刷新的 loading
      refreshSuccessText: '刷新成功'
    }
  },
  methods: {
    // 初始化或者滚动到底部的时候会触发调用 onLoad
    async onLoad () {
      try {
        // 1.请求获取数据
        const { data } = await getArticles({
          channel_id: this.channel.id, // 频道id
          timestamp: this.timestamp || Date.now(), // 页码
          with_top: 1
        })
        // 模拟测试加载失败的情况
        // if (Math.random() > 0.5) {
        //   JSON.parse('dasdasda')
        // }
        const { results } = data.data
        this.list.push(...results)
        this.loading = false
        if (results.length) {
          // 更新获取下一页数据的时间戳
          this.timestamp = data.data.pre_timestamp
        } else {
          // 没有数据了，设置加载状态结束，不再触发上拉加载更多
          this.finished = true
        }
      } catch (err) {
        console.log('请求失败', err)
        this.loading = false // 失败关闭loading加载
        this.error = true // 开启错误提示
      }
    },
    // 当下拉刷新的时候会触发调用该函数
    async onRefresh () {
      try {
        // 1.请求获取数据
        const { data } = await getArticles({
          channel_id: this.channel.id, // 频道id
          timestamp: Date.now(), // 下拉刷新，每次请求获取
          with_top: 1 // 是否包含置顶，进入页面第一次请求
        })
        // 模拟测试下拉刷新失败
        // if (Math.random() > 0.1) {
        //   JSON.parse('dasdasda')
        // }

        // 2.将数据追加到列表的顶部
        const { results } = data.data
        this.list.unshift(...results)
        // 3.关闭下拉刷新的 loading 状态
        this.isFreshLoading = false
        // 更新下拉刷新成功提示的文本
        this.refreshSuccessText = `刷新成功,更新了${results.length}条数据`
      } catch (err) {
        this.isFreshLoading = false
        this.refreshSuccessText = '刷新失败'
      }
    }
  }
}
</script>

<style lang="less">
  .article-list {
    // 百分比单位是相对于父元素
    // height: 100%
    height: 79vh;
    overflow-y: auto;
  }
</style>
