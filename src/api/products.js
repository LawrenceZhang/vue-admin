import fetch from '@/utils/fetch'

export function getProducts(params) {
  return fetch({
    url: '/queryproduct',
    method: 'get',
    params
  })
}
