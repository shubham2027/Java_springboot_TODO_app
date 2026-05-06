import { request } from './httpClient'

export function getUsers() {
  return request('/api/users')
}

export function createUser(payload) {
  return request('/api/users', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function updateUser(userId, payload) {
  return request(`/api/users/${userId}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
}

export function deleteUser(userId) {
  return request(`/api/users/${userId}`, {
    method: 'DELETE',
  })
}
