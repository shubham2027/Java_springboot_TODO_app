import { useState } from 'react'
import { StatusMessage } from '../components/shared/StatusMessage'
import { Panel } from '../components/shared/Panel'
import { UserForm } from '../components/users/UserForm'
import { UserList } from '../components/users/UserList'
import { useUsers } from '../hooks/useUsers'

export function UsersPage({ onOpenTodos }) {
  const { users, loading, error, addUser, editUser, removeUser } = useUsers()
  const [busy, setBusy] = useState(false)
  const [actionError, setActionError] = useState('')

  async function handleCreate(form) {
    setBusy(true)
    setActionError('')

    try {
      await addUser(form)
    } catch (err) {
      setActionError(err.message)
    } finally {
      setBusy(false)
    }
  }

  async function handleDelete(userId) {
    setActionError('')
    try {
      await removeUser(userId)
    } catch (err) {
      setActionError(err.message)
    }
  }

  async function handleUpdate(userId, payload) {
    setActionError('')
    try {
      await editUser(userId, payload)
    } catch (err) {
      setActionError(err.message)
    }
  }

  return (
    <main className="stack">
      <Panel
        title="Users"
        subtitle="Create and manage accounts before assigning todos."
      >
        <UserForm onSubmit={handleCreate} busy={busy} />
        <StatusMessage kind="error" text={actionError} />
      </Panel>

      <Panel title="All Users" subtitle="Select one user to open their todo workspace.">
        {loading ? <p className="loading">Loading users...</p> : null}
        <StatusMessage kind="error" text={error} />
        <UserList
          users={users}
          onOpenTodos={onOpenTodos}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      </Panel>
    </main>
  )
}
