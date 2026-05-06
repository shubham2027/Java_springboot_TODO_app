import { useState } from 'react'

const initialState = {
  username: '',
  email: '',
  password: '',
}

export function UserForm({ onSubmit, busy }) {
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
        Username
        <input
          name="username"
          value={form.username}
          onChange={onChange}
          minLength={3}
          required
          placeholder="john_doe"
        />
      </label>

      <label>
        Email
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={onChange}
          required
          placeholder="john@example.com"
        />
      </label>

      <label>
        Password
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={onChange}
          minLength={6}
          required
          placeholder="password123"
        />
      </label>

      <button type="submit" disabled={busy}>
        {busy ? 'Creating...' : 'Create User'}
      </button>
    </form>
  )
}
