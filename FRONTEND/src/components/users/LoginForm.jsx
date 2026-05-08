import { useState } from 'react'
import { validatePassword, validateUsername } from '../../utils/validation'

const initialState = {
  username: '',
  password: '',
}

export function LoginForm({ onSubmit, busy }) {
  const [form, setForm] = useState(initialState)
  const [fieldErrors, setFieldErrors] = useState({})

  function onChange(event) {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function submit(event) {
    event.preventDefault()

    const nextErrors = {
      username: validateUsername(form.username),
      password: validatePassword(form.password),
    }
    setFieldErrors(nextErrors)

    if (nextErrors.username || nextErrors.password) {
      return
    }

    await onSubmit(form)
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
          pattern="[A-Za-z0-9_]{3,30}"
          required
          placeholder="john_doe"
        />
        {fieldErrors.username ? <small className="field-error">{fieldErrors.username}</small> : null}
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
        {fieldErrors.password ? <small className="field-error">{fieldErrors.password}</small> : null}
      </label>

      <button type="submit" disabled={busy}>
        {busy ? 'Logging in...' : 'Login'}
      </button>
    </form>
  )
}
