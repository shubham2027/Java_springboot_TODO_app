import { useCallback, useEffect, useState } from 'react'
import { createTodo, deleteTodo, getTodosByUser, updateTodo } from '../api/todosApi'

export function useTodos(userId) {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const loadTodos = useCallback(async () => {
    if (!userId) {
      setTodos([])
      return
    }

    setLoading(true)
    setError('')

    try {
      const data = await getTodosByUser(userId)
      setTodos(Array.isArray(data) ? data : [])
    } catch (err) {
      const isEmptyState = err.message?.toLowerCase().includes('nothing to show')
      if (isEmptyState) {
        setTodos([])
        setError('')
      } else {
        setError(err.message)
      }
    } finally {
      setLoading(false)
    }
  }, [userId])

  useEffect(() => {
    loadTodos()
  }, [loadTodos])

  async function addTodo(payload) {
    const created = await createTodo(userId, payload)
    setTodos((prev) => [...prev, created])
    return created
  }

  async function editTodo(todoId, payload) {
    const updated = await updateTodo(userId, todoId, payload)
    setTodos((prev) => prev.map((todo) => (todo.id === todoId ? updated : todo)))
    return updated
  }

  async function toggleTodo(todo) {
    const payload = {
      title: todo.title,
      description: todo.description,
      completed: !todo.completed,
    }
    return editTodo(todo.id, payload)
  }

  async function removeTodo(todoId) {
    await deleteTodo(userId, todoId)
    setTodos((prev) => prev.filter((todo) => todo.id !== todoId))
  }

  return {
    todos,
    loading,
    error,
    loadTodos,
    addTodo,
    editTodo,
    toggleTodo,
    removeTodo,
  }
}
