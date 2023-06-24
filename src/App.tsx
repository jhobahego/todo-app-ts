import { useState } from 'react'
import { Todos } from './components/Todos'
import { type TodoId, type Todo, type FilterValue } from './types'
import { Footer } from './components/Footer'
import { TODO_FILTERS } from './consts'

const mockTodos = [
  {
    id: '1',
    title: 'todo 1',
    completed: false
  },
  {
    id: '2',
    title: 'todo 2',
    completed: false
  },
  {
    id: '3',
    title: 'todo 3',
    completed: false
  }
]

function App (): JSX.Element {
  const [todos, setTodos] = useState(mockTodos)
  const [filterSelected, setFilterSelected] = useState<FilterValue>(TODO_FILTERS.ALL)

  const handleRemove = ({ id }: TodoId): void => {
    const newTodos = todos.filter(todo => todo.id !== id)
    setTodos(newTodos)
  }

  const handleClearCompleted = (): void => {
    const newTodos = todos.filter(todo => !todo.completed)
    setTodos(newTodos)
  }

  const handleCompletedToggleTodo = ({ id, completed }: Pick<Todo, 'id' | 'completed'>): void => {
    const newTodos = todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completed
        }
      }

      return todo
    })

    setTodos(newTodos)
  }

  const activeCount = todos.length
  const completedCount = todos.filter(todo => todo.completed).length

  const handleFilterSelected = (filter: FilterValue): void => {
    setFilterSelected(filter)
  }

  const filteredTodos = todos.filter(todo => {
    if (filterSelected === 'active') return !todo.completed
    if (filterSelected === 'completed') return todo.completed
    return todo
  })

  return (
    <div className='todoapp'>
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
