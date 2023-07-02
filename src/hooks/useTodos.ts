import { type TodoId, type Todo, type TodoTitle } from '../types'
import { completeTodo, createTodo, deleteAllCompleted, deleteTodo, getTodos } from '../services/task'
import { useEffect, useState } from 'react'

export const useTodos = (): {
  todos: Todo[]
  handleCompletedToggleTodo: ({ id, completed }: Pick<Todo, 'id' | 'completed'>) => void
  handleClearCompleted: () => void
  handleRemove: ({ id }: TodoId) => void
  addTodo: ({ title }: TodoTitle) => void
} => {
  const [todos, setTodos] = useState<Todo[]>([])

  useEffect(() => {
    getTodos()
      .then(newTodo => { setTodos(newTodo) })
      .catch((error) => { console.log(error) })
  }, [])

  const handleRemove = ({ id }: TodoId): void => {
    deleteTodo({ id })
      .catch((error) => { console.log(error) })

    const newTodos = todos.filter(todo => todo.id !== id)
    setTodos(newTodos)
  }

  const handleClearCompleted = (): void => {
    deleteAllCompleted()
      .catch((error) => { console.log(error) })

    const newTodos = todos.filter(todo => !todo.completed)
    setTodos(newTodos)
  }

  const handleCompletedToggleTodo = ({ id, completed }: Pick<Todo, 'id' | 'completed'>): void => {
    completeTodo({ id })
      .catch((error) => { console.log(error) })

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

  const addTodo = ({ title }: TodoTitle): void => {
    createTodo({ title })
      .then(newTodo => {
        const newTodos = [...todos, newTodo]
        setTodos(newTodos)
      })
      .catch((error) => { console.log(error) })
  }

  return { todos, handleCompletedToggleTodo, handleClearCompleted, handleRemove, addTodo }
}
