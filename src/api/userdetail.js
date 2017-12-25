import fetch from '@/utils/fetch'

export function getPetInfoByUserId(params) {
  return fetch({
    url: '/pet',
    method: 'get',
    params
  })
}

export function addPet(data) {
  return fetch({
    url: '/pet',
    method: 'post',
    data
  })
}

export function updatePet(data) {
  return fetch({
    url: '/pet',
    method: 'put',
    data
  })
}

export function deleteProduct(data) {
  return fetch({
    url: '/pet',
    method: 'delete',
    data
  })
}
