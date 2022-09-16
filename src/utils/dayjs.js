import dayjs from 'dayjs'

// 加载中文语言包
import 'dayjs/locale/zh-cn'

import relativeTime from 'dayjs/plugin/relativeTime'
import Vue from 'vue'

// 配置使用处理相对时间的插件
dayjs.extend(relativeTime)

// dayjs默认是引文，这里设置为中文
dayjs.locale('zh-cn') // 全局使用

Vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
})

// dayjs获取当前最新时间
// dayjs().format('YYYY-MM-DD')

// console.log(dayjs().from(dayjs('1990-01-01'))) // 31 年后
// dayjs().from(dayjs('1990-01-01'), true) // 31 年
// dayjs().fromNow()

// dayjs().to(dayjs('1990-01-01')) // 31 年前
// dayjs().toNow()
