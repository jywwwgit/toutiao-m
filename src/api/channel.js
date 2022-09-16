/**
 * 频道请求模块
 */
import request from '@/utils/request'
// import store from '@/store'
// 约定存储数据的KEY，约定存储数据的格式
// const KEY = 'TOUTIAO_CHANNELS'

/**
 * 获取所有频道模块
 */
export const getAllChannels = () => {
  return request({
    method: 'GET',
    url: '/v1_0/channels'
  })
}

/**
 * 获取用户频道模块
 */
export const getMyChannels = () => {
  return request({
    method: 'GET',
    url: '/v1_0/channels'
  })
}

// 添加用户频道
export const addUserChannel = channels => {
  return request({
    method: 'PUT',
    url: '/v1_0/user/channels',
    data: {
      channels
    }
  })
}

// 删除用户频道
export const deleteUserChannel = channelId => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/channels/${channelId}`
  })
}
