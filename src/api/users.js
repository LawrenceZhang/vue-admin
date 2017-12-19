import fetch from '@/utils/fetch'

export function getUserInfoByAny(params) {
  return fetch({
    url: '/user',
    method: 'get',
    params
  })
}

export function getPetInfoByUserId(params) {
  return fetch({
    url: '/pet',
    method: 'get',
    params
  })
}
