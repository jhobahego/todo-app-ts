import { useState } from 'react'
import { type FilterValue } from './types'
import { Todos } from './components/Todos'
import { Footer } from './components/Footer'
import { TODO_FILTERS } from './consts'
import { Header } from './components/Header'
import { useTodos } from './hooks/useTodos'

function App (): JSX.Element {
  const { todos, addTodo, handleClearCompleted, handleCompletedToggleTodo, handleRemove } = useTodos()
  const [filterSelected, setFilterSelected] = useState<FilterValue>(TODO_FILTERS.ALL)

  const activeCount = todos.length
  const completedCount = todos.filter(todo => todo.completed).length

  const handleFilterSelected = (filter: FilterValue): void => {
    setFilterSelected(filter)
  }

  const filteredTodos = todos.filter(todo => {
    if (filterSelected === 'active' as FilterValue) return !todo.completed
    if (filterSelected === 'completed') return todo.completed
    return todo
  })

  return (
    <div className='todoapp'>
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
    </div>
  )
}

export default App
