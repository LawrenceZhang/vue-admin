import fetch from '@/utils/fetch'

export function getProductList(params) {
  return fetch({
    url: '/product',
    method: 'get',
    params
  })
}

export function addProduct(data) {
  return fetch({
    url: '/product',
    method: 'post',
    data
  })
}

export function updateProduct(data) {
  return fetch({
    url: '/product',
    method: 'put',
    data
  })
}

export function deleteProduct(params) {
  return fetch({
    url: '/product?id=' + params.id,
    method: 'delete'
  })
}

export function modifyInventory(data) {
  return fetch({
    url: '/productinventory',
    method: 'put',
    data
  })
}
