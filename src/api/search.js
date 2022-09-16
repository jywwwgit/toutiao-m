// 用户搜索相关
import request from '@/utils/request'

// 搜索建议
export const getSearchSuggest = q => {
  return request({
    method: 'GET',
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}

// 搜索结果
export const getSearchResult = params => {
  return request({
    method: 'GET',
    url: '/v1_0/search',
    params
  })
}
