import { useEffect, useState } from 'react'
import { Todos } from './components/Todos'
import { type TodoId, type Todo, type FilterValue, type TodoTitle } from './types'
import { Footer } from './components/Footer'
import { TODO_FILTERS } from './consts'
import { Header } from './components/Header'
import { createTodo, deleteTodo, getTodos } from './services/task'

function App (): JSX.Element {
  const [todos, setTodos] = useState<Todo[]>([])
  const [filterSelected, setFilterSelected] = useState<FilterValue>(TODO_FILTERS.ALL)

  useEffect(() => {
    getTodos()
      .then(res => { setTodos(res) })
      .catch((error) => { console.log(error) })
  }, [])

  const handleRemove = ({ id }: TodoId): void => {
    deleteTodo({ id })
      .catch((error) => { console.log(error) })

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

  const addTodo = ({ title }: TodoTitle): void => {
    createTodo({ title })
      .then(newTodo => {
        const newTodos = [...todos, newTodo]
        setTodos(newTodos)
      })
      .catch((error) => { console.log(error) })
  }

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
