import { useState } from 'react'
import { createUser, loginUser } from '../api/usersApi'
import { StatusMessage } from '../components/shared/StatusMessage'
import { Panel } from '../components/shared/Panel'
import { LoginForm } from '../components/users/LoginForm'
import { UserForm } from '../components/users/UserForm'

export function UsersPage({ onOpenTodos }) {
  const [registerBusy, setRegisterBusy] = useState(false)
  const [loginBusy, setLoginBusy] = useState(false)
  const [registerError, setRegisterError] = useState('')
  const [loginError, setLoginError] = useState('')
  const [registerSuccess, setRegisterSuccess] = useState('')

  async function handleCreate(form) {
    setRegisterBusy(true)
    setRegisterError('')
    setRegisterSuccess('')

    try {
      await createUser(form)
      setRegisterSuccess('Account created. You can log in now.')
    } catch (err) {
      setRegisterError(err.message)
    } finally {
      setRegisterBusy(false)
    }
  }

  async function handleLogin(form) {
    setLoginBusy(true)
    setLoginError('')

    try {
      const loggedInUser = await loginUser(form)
      onOpenTodos(loggedInUser)
    } catch (err) {
      setLoginError(err.message)
    } finally {
      setLoginBusy(false)
    }
  }

  return (
    <main className="stack">
      <Panel
        title="Create Account"
        subtitle="Register with a valid username, email, and password."
      >
        <UserForm onSubmit={handleCreate} busy={registerBusy} />
        <StatusMessage kind="error" text={registerError} />
        <StatusMessage kind="success" text={registerSuccess} />
      </Panel>

      <Panel title="Login" subtitle="Only logged-in users can manage their own todos.">
        <LoginForm onSubmit={handleLogin} busy={loginBusy} />
        <StatusMessage kind="error" text={loginError} />
      </Panel>
    </main>
  )
}
