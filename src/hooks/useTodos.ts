import { type TodoId, type Todo, type TodoTitle, type ApiError } from '../types'
import { completeTodo, createTodo, deleteAllCompleted, deleteTodo, getTodos } from '../services/task'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

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
      .catch((error) => {
        const { status, data } = error.response as ApiError
        if (status === 404) {
          toast.error(data.detail)
        }
      })

    const newTodos = todos.filter(todo => todo.id !== id)
    setTodos(newTodos)
    toast.success('Tarea eliminada correctamente')
  }

  const handleClearCompleted = (): void => {
    deleteAllCompleted()
      .catch((error) => { console.log(error) })

    const newTodos = todos.filter(todo => !todo.completed)
    setTodos(newTodos)
    toast.success('Tareas eliminadas correctamente')
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

    completeTodo({ id })
      .then(({ data }) => {
        toast.success(data.message)
        setTodos(newTodos)
      })
      .catch((error) => {
        const { status, data } = error.response as ApiError
        if (status === 404) {
          toast.error(data.detail)
        } else {
          toast.error('Ha habido un error, intente nuevamente mas tarde')
        }
      })
  }

  const addTodo = ({ title }: TodoTitle) => {
    createTodo({ title })
      .then(({ data }) => {
        const newTodos = [
          ...todos,
          data.task
        ]
        toast.success(data.message)
        setTodos(newTodos)
      })
      .catch((error) => {
        const { data } = error.response as ApiError
        toast.error(data.detail)
      })
  }

  return { todos, handleCompletedToggleTodo, handleClearCompleted, handleRemove, addTodo }
}
