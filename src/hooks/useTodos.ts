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
      .then(res => { setTodos(res.data) })
      .catch((error) => {
        const { code } = error
        if (code === 'ERR_NETWORK') {
          const localTodos = localStorage.getItem('todos')
          if (localTodos != null) {
            setTodos(JSON.parse(localTodos))
          }
          return
        }

        toast.error('Ha habido un error, intente nuevamente mas tarde')
      })
  }, [])

  const handleRemove = ({ id }: TodoId): void => {
    deleteTodo({ id })
      .catch((error) => {
        const { code } = error
        if (code === 'ERR_NETWORK') {
          const newTodos = todos.filter(todo => todo.id !== id)
          setTodos(newTodos)
          localStorage.setItem('todos', JSON.stringify(newTodos))
          return
        }

        const { status, data } = error.response as ApiError
        if (status === 404) {
          toast.error(data.detail)
        }
      })

    const newTodos = todos.filter(todo => todo.id !== id)
    setTodos(newTodos)
    localStorage.setItem('todos', JSON.stringify(newTodos))
    toast.success('Tarea eliminada correctamente')
  }

  const handleClearCompleted = (): void => {
    deleteAllCompleted()
      .catch((error) => {
        const { code } = error
        if (code === 'ERR_NETWORK') {
          const newTodos = todos.filter(todo => !todo.completed)
          setTodos(newTodos)
          localStorage.setItem('todos', JSON.stringify(newTodos))
        }
      })

    const newTodos = todos.filter(todo => !todo.completed)
    setTodos(newTodos)
    localStorage.setItem('todos', JSON.stringify(newTodos))
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
        localStorage.setItem('todos', JSON.stringify(newTodos))
      })
      .catch((error) => {
        const { code } = error
        if (code === 'ERR_NETWORK') {
          const localTodos = JSON.parse(localStorage.getItem('todos') ?? '[]')
          const todo = localTodos.find((todo: Todo) => todo.id === id)

          if (todo == null) return toast.error('Tarea no encontrada')

          const newTodos = localTodos.map((todo: Todo) => {
            if (todo.id === id) {
              return {
                ...todo,
                completed
              }
            }

            return todo
          })

          setTodos(newTodos)
          localStorage.setItem('todos', JSON.stringify(newTodos))
          toast.success('Tarea actualizada correctamente')
          return
        }

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
        const { code } = error
        if (code === 'ERR_NETWORK') {
          const localTodos = JSON.parse(localStorage.getItem('todos') ?? '[]')
          const todo = localTodos.find((todo: Todo) => todo.title.toLowerCase().trim() === title.toLowerCase().trim())
          if (todo != null) return toast.error('Tarea ya existente, cambie el titulo')

          const newTodos = [
            ...localTodos,
            {
              id: new Date().getTime(),
              title,
              completed: false
            }
          ]
          setTodos(newTodos)
          localStorage.setItem('todos', JSON.stringify(newTodos))

          return toast.success('Tarea guardada correctamente')
        }

        const { data } = error.response as ApiError
        toast.error(data.detail)
      })
  }

  return { todos, handleCompletedToggleTodo, handleClearCompleted, handleRemove, addTodo }
}
