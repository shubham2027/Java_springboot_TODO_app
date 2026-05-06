import { useState } from 'react'

export function UserList({ users, onOpenTodos, onDelete, onUpdate }) {
  const [editingId, setEditingId] = useState(null)
  const [draft, setDraft] = useState({ username: '', email: '', password: '' })

  function startEdit(user) {
    setEditingId(user.id)
    setDraft({
      username: user.username,
      email: user.email,
      password: '',
    })
  }

  async function saveEdit(userId) {
    const payload = {
      username: draft.username,
      email: draft.email,
      ...(draft.password ? { password: draft.password } : {}),
    }
    await onUpdate(userId, payload)
    setEditingId(null)
  }

  if (!users.length) {
    return <p className="empty">No users yet. Create your first user.</p>
  }

  return (
    <div className="list-grid">
      {users.map((user) => {
        const isEditing = editingId === user.id

        return (
          <article className="list-item" key={user.id}>
            {isEditing ? (
              <div className="inline-form">
                <input
                  value={draft.username}
                  onChange={(event) => setDraft((prev) => ({ ...prev, username: event.target.value }))}
                  minLength={3}
                />
                <input
                  type="email"
                  value={draft.email}
                  onChange={(event) => setDraft((prev) => ({ ...prev, email: event.target.value }))}
                />
                <input
                  type="password"
                  value={draft.password}
                  placeholder="Optional new password"
                  onChange={(event) => setDraft((prev) => ({ ...prev, password: event.target.value }))}
                />
              </div>
            ) : (
              <div>
                <h3>{user.username}</h3>
                <p>{user.email}</p>
              </div>
            )}

            <div className="actions-row">
              <button type="button" onClick={() => onOpenTodos(user)}>
                Open Todos
              </button>

              {isEditing ? (
                <>
                  <button type="button" onClick={() => saveEdit(user.id)}>
                    Save
                  </button>
                  <button type="button" className="ghost" onClick={() => setEditingId(null)}>
                    Cancel
                  </button>
                </>
              ) : (
                <button type="button" className="ghost" onClick={() => startEdit(user)}>
                  Edit
                </button>
              )}

              <button type="button" className="danger" onClick={() => onDelete(user.id)}>
                Delete
              </button>
            </div>
          </article>
        )
      })}
    </div>
  )
}
