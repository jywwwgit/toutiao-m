<template>
  <div class='search-cotainer'>
    <!-- 搜索栏 -->
    <!-- Tips: 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮。 -->
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
  </form>
  <!-- 搜索栏 -->

  <!-- 搜索结果 -->
  <search-result
  v-if="isResultShow"
  :search-text="searchText"
  />
  <!-- 搜索结果 -->

  <!-- 搜索建议 -->
  <search-suggest
    :search-text="searchText"
    v-else-if="searchText"
    @search="onSearch"
  />
  <!-- 搜索建议 -->

  <!-- 搜索历史记录 -->
  <search-history
    v-else
    :search-histories="searchHistories"
    @clear-search-histories="searchHistories = []"
    @search="onSearch"
  />
  <!-- 搜索历史记录 -->

  </div>
</template>

<script>
import SearchHistory from './components/search-history.vue'
import SearchSuggest from './components/search-suggest.vue'
import SearchResult from './components/search-result.vue'
import { setItem, getItem } from '@/utils/storage'
export default {
  name: 'SearchIndex',
  components: {
    SearchHistory,
    SearchSuggest,
    SearchResult
  },
  props: {},
  data () {
    return {
      searchText: '',
      isResultShow: false,
      searchHistories: getItem('TOUTIAO_SEARCH_HISTORIES') || [] // 搜索历史记录数据
    }
  },
  computed: {},
  watch: {
    searchHistories (value) {
      setItem('TOUTIAO_SEARCH_HISTORIES', value)
    }
  },
  created () {},
  mounted () {},
  methods: {
    onSearch (val) {
      // 更新文本框内容
      this.searchText = val

      // 存储搜索历史记录
      // 要求：不要有重复搜索记录，最新的排在最前面
      const index = this.searchHistories.indexOf(val)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(val)

      // 渲染搜索结果
      this.isResultShow = true
    },
    onCancel () {
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="less">
  .search-cotainer {
    .van-search {
      background-color: #3296fa;
      .van-search__action {
        color: #fff;
        font-size: 28px;
      }
    }
  }
</style>
