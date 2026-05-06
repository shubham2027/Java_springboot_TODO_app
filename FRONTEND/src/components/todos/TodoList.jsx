import { useState } from 'react'

export function TodoList({ todos, onDelete, onToggle, onUpdate }) {
  const [editingId, setEditingId] = useState(null)
  const [draft, setDraft] = useState({ title: '', description: '', completed: false })

  function startEdit(todo) {
    setEditingId(todo.id)
    setDraft({
      title: todo.title,
      description: todo.description,
      completed: Boolean(todo.completed),
    })
  }

  async function save(todoId) {
    await onUpdate(todoId, draft)
    setEditingId(null)
  }

  if (!todos.length) {
    return <p className="empty">No todos yet. Create one from the form above.</p>
  }

  return (
    <div className="list-grid">
      {todos.map((todo) => {
        const isEditing = editingId === todo.id

        return (
          <article className="list-item" key={todo.id}>
            {isEditing ? (
              <div className="inline-form">
                <input
                  value={draft.title}
                  onChange={(event) => setDraft((prev) => ({ ...prev, title: event.target.value }))}
                  minLength={3}
                  maxLength={100}
                />
                <textarea
                  rows={3}
                  value={draft.description}
                  onChange={(event) =>
                    setDraft((prev) => ({ ...prev, description: event.target.value }))
                  }
                  maxLength={500}
                />
                <label className="checkbox-inline">
                  <input
                    type="checkbox"
                    checked={draft.completed}
                    onChange={(event) =>
                      setDraft((prev) => ({ ...prev, completed: event.target.checked }))
                    }
                  />
                  Completed
                </label>
              </div>
            ) : (
              <div>
                <div className="todo-head">
                  <h3>{todo.title}</h3>
                  <span className={`pill ${todo.completed ? 'done' : 'pending'}`}>
                    {todo.completed ? 'Completed' : 'Pending'}
                  </span>
                </div>
                <p>{todo.description}</p>
              </div>
            )}

            <div className="actions-row">
              <button type="button" onClick={() => onToggle(todo)}>
                {todo.completed ? 'Mark Pending' : 'Mark Complete'}
              </button>

              {isEditing ? (
                <>
                  <button type="button" onClick={() => save(todo.id)}>
                    Save
                  </button>
                  <button type="button" className="ghost" onClick={() => setEditingId(null)}>
                    Cancel
                  </button>
                </>
              ) : (
                <button type="button" className="ghost" onClick={() => startEdit(todo)}>
                  Edit
                </button>
              )}

              <button type="button" className="danger" onClick={() => onDelete(todo.id)}>
                Delete
              </button>
            </div>
          </article>
        )
      })}
    </div>
  )
}
