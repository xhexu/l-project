import request from '@/utils/request'


// 列表
export function listPage() {
  return request({
    url: '/talkTheme/list',
    method: 'post',
  })
}




