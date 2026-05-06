import { request } from './httpClient'

export function getTodosByUser(userId) {
  return request(`/api/users/${userId}/todos`)
}

export function createTodo(userId, payload) {
  return request(`/api/users/${userId}/todos`, {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function updateTodo(userId, todoId, payload) {
  return request(`/api/users/${userId}/todos/${todoId}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
}

export function deleteTodo(userId, todoId) {
  return request(`/api/users/${userId}/todos/${todoId}`, {
    method: 'DELETE',
  })
}
