<template>
  <div class='search-suggest'>
    <van-cell
      :title="text"
      icon="search"
      v-for="(text, index) in suggestions"
      :key="index"
      @click="$emit('search', text)"
    >
    <div slot="title" v-html="highlight(text)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggest } from '@/api/search'
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggest',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestions: [] // 搜索建议数据列表
    }
  },
  computed: {},
  watch: {
    searchText: {
      // 当searchText发生改变时就会调用handelr
      handler: debounce(function (value) {
        this.loadSearchSuggest(value)
      }, 200),
      // 该回调在侦听开始后立即被调用
      immediate: true
    }
  },
  created () {},
  mounted () {},
  methods: {
    async loadSearchSuggest (q) {
      try {
        const { data } = await getSearchSuggest(q)
        this.suggestions = data.data.options
        // console.log(data)
      } catch (err) {
        this.$toast('获取数据失败，请稍后重试')
      }
    },
    highlight (text) {
      const highlightStr = `<span class="active">${this.searchText}</span>`
      // 正则表达式中间的内容都会当成字符来使用
      // RegExp 正则表达式构造函数
      //    参数1: 匹配模式字符串， 它会根据这个字符串创建正则对象
      //    参数2: 匹配模式，要写到字符串中
      const reg = new RegExp(this.searchText, 'gi')
      return text.replace(reg, highlightStr)
    }
  }
}
</script>

<style scoped lang='less'>
  .search-suggest {
    /deep/ span.active {
      color: #3296fa;
    }
  }
</style>
