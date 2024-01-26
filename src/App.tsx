import { Todos } from './components/Todos'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { useTodos } from './hooks/useTodos'
import { useFilters } from './hooks/useFilters'
import { Toaster } from 'sonner'
import { Session } from './components/Session'
import { AuthContextProvider } from './context/AuthContext'

function App (): JSX.Element {
  const { todos, addTodo, handleClearCompleted, handleCompletedToggleTodo, handleRemove } = useTodos()
  const { activeCount, completedCount, filterSelected, handleFilterSelected, filteredTodos } = useFilters(todos)

  return (
    <AuthContextProvider>
      <section className='container'>
        <Session />
        <article className='todoapp'>
          <Header saveTodo={addTodo} />
          <Todos
            onToggleCompleteTodo={handleCompletedToggleTodo}
            onRemoveTodo={handleRemove}
            todos={filteredTodos}
          />
          <Footer
            activeCount={activeCount}
            completedCount={completedCount}
            filterSelected={filterSelected}
            onFilterChange={handleFilterSelected}
            onClearCompleted={handleClearCompleted}
          />
          <Toaster position='top-right' />
        </article>
      </section>
    </AuthContextProvider>
  )
}

export default App
