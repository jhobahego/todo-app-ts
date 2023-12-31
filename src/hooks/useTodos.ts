import { type TodoId, type Todo, type TodoTitle } from '../types'
import { completeTodo, createTodo, deleteAllCompleted, deleteTodo, getTodos } from '../services/task'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { type AxiosResponse, type AxiosError } from 'axios'

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
        const axiosError = error as AxiosError
        if (axiosError.response?.status === 404) {
          toast.error('La tarea ya estaba eliminada')
        }
      })

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
      .then((respuesta: AxiosResponse) => {
        console.log(respuesta.status)

        toast.success('Tarea actualizada correctamente')
        setTodos(newTodos)
      })
      .catch((error) => {
        const axiosError = error as AxiosError
        if (axiosError.response?.status === 404) {
          toast.error('tarea no encontrada recargue la pagina')
        } else {
          toast.error(axiosError.code)
        }
      })
  }

  const addTodo = ({ title }: TodoTitle) => {
    createTodo({ title })
      .then(({ data }) => {
        const newTodos = [
          ...todos,
          data.tarea
        ]
        toast.success(data.mensaje)
        setTodos(newTodos)
      })
      .catch((error) => {
        const axiosError = error as AxiosError
        toast.error(axiosError.response?.data as string)
      })
  }

  return { todos, handleCompletedToggleTodo, handleClearCompleted, handleRemove, addTodo }
}
