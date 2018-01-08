import fetch from '@/utils/fetch'

export function getProductList(params) {
  return fetch({
    url: '/product',
    method: 'get',
    params
  })
}
