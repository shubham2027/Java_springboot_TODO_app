import { useState } from 'react'
import { deleteUser } from '../api/usersApi'
import { StatusMessage } from '../components/shared/StatusMessage'
import { Panel } from '../components/shared/Panel'
import { TodoForm } from '../components/todos/TodoForm'
import { TodoList } from '../components/todos/TodoList'
import { useTodos } from '../hooks/useTodos'

export function TodosPage({ user, onBack, onUserDeleted }) {
  const { todos, loading, error, addTodo, editTodo, toggleTodo, removeTodo } = useTodos(user.id)
  const [busy, setBusy] = useState(false)
  const [actionError, setActionError] = useState('')

  async function handleCreate(form) {
    setBusy(true)
    setActionError('')
    try {
      await addTodo(form)
    } catch (err) {
      setActionError(err.message)
    } finally {
      setBusy(false)
    }
  }

  async function handleDelete(todoId) {
    setActionError('')
    try {
      await removeTodo(todoId)
    } catch (err) {
      setActionError(err.message)
    }
  }

  async function handleToggle(todo) {
    setActionError('')
    try {
      await toggleTodo(todo)
    } catch (err) {
      setActionError(err.message)
    }
  }

  async function handleUpdate(todoId, payload) {
    setActionError('')
    try {
      await editTodo(todoId, payload)
    } catch (err) {
      setActionError(err.message)
    }
  }

  async function handleDeleteUser() {
    setActionError('')
    try {
      await deleteUser(user.id)
      onUserDeleted()
    } catch (err) {
      setActionError(err.message)
    }
  }

  return (
    <main className="stack">
      <Panel
        title={`Todos for ${user.username}`}
        subtitle={user.email}
        actions={
          <div className="actions-row">
            <button type="button" className="ghost" onClick={onBack}>
              Logout
            </button>
            <button type="button" className="danger" onClick={handleDeleteUser}>
              Delete User
            </button>
          </div>
        }
      >
        <TodoForm onSubmit={handleCreate} busy={busy} />
        <StatusMessage kind="error" text={actionError} />
      </Panel>

      <Panel title="Task Board" subtitle="You can manage todos only for this logged-in account.">
        {loading ? <p className="loading">Loading todos...</p> : null}
        <StatusMessage kind="error" text={error} />
        <TodoList
          todos={todos}
          onDelete={handleDelete}
          onToggle={handleToggle}
          onUpdate={handleUpdate}
        />
      </Panel>
    </main>
  )
}
