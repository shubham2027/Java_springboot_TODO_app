import { useState } from 'react'

const initialState = {
  title: '',
  description: '',
}

export function TodoForm({ onSubmit, busy }) {
  const [form, setForm] = useState(initialState)

  function onChange(event) {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function submit(event) {
    event.preventDefault()
    await onSubmit(form)
    setForm(initialState)
  }

  return (
    <form className="form-grid" onSubmit={submit}>
      <label>
        Title
        <input
          name="title"
          value={form.title}
          onChange={onChange}
          minLength={3}
          maxLength={100}
          required
          placeholder="Plan sprint review"
        />
      </label>

      <label>
        Description
        <textarea
          name="description"
          value={form.description}
          onChange={onChange}
          maxLength={500}
          required
          placeholder="Add agenda and owner notes"
          rows={4}
        />
      </label>

      <button type="submit" disabled={busy}>
        {busy ? 'Creating...' : 'Create Todo'}
      </button>
    </form>
  )
}
