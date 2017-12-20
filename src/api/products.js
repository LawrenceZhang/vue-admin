import fetch from '@/utils/fetch'

export function getProductList(params) {
  return fetch({
    url: '/queryproduct',
    method: 'get',
    params
  })
}

export function addProduct(data) {
  return fetch({
    url: '/addproduct',
    method: 'post',
    data
  })
}

export function updateProduct(data) {
  return fetch({
    url: '/modifyproduct',
    method: 'put',
    data
  })
}

export function deleteProduct(data) {
  return fetch({
    url: '/deleteproduct',
    method: 'delete',
    data
  })
}

export function modifyInventory(data) {
  return fetch({
    url: '/modifyproductinventory',
    method: 'delete',
    data
  })
}
