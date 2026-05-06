import { useCallback, useEffect, useState } from 'react'
import { createUser, deleteUser, getUsers, updateUser } from '../api/usersApi'

export function useUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const loadUsers = useCallback(async () => {
    setLoading(true)
    setError('')

    try {
      const data = await getUsers()
      setUsers(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadUsers()
  }, [loadUsers])

  async function addUser(payload) {
    const created = await createUser(payload)
    setUsers((prev) => [...prev, created])
    return created
  }

  async function editUser(userId, payload) {
    const updated = await updateUser(userId, payload)
    setUsers((prev) => prev.map((user) => (user.id === userId ? updated : user)))
    return updated
  }

  async function removeUser(userId) {
    await deleteUser(userId)
    setUsers((prev) => prev.filter((user) => user.id !== userId))
  }

  return {
    users,
    loading,
    error,
    loadUsers,
    addUser,
    editUser,
    removeUser,
  }
}
