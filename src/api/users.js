import fetch from '@/utils/fetch'

export function getUserInfoByAny(params) {
  return fetch({
    url: '/user',
    method: 'get',
    params
  })
}
