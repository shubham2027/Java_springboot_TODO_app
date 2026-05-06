import { useState } from 'react'
import { UsersPage } from './pages/UsersPage'
import { TodosPage } from './pages/TodosPage'
import './styles/theme.css'

function App() {
  const [activeUser, setActiveUser] = useState(null)

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">Spring Boot + React</p>
          <h1>Todo Studio</h1>
        </div>
        <p className="hint">API: http://localhost:8080</p>
      </header>

      {activeUser ? (
        <TodosPage
          user={activeUser}
          onBack={() => setActiveUser(null)}
          onUserDeleted={() => setActiveUser(null)}
        />
      ) : (
        <UsersPage onOpenTodos={setActiveUser} />
      )}
    </div>
  )
}

export default App
