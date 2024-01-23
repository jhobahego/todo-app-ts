import { type TODO_FILTERS } from './consts'

declare global {
  interface ImportMeta {
    env: Record<string, string>
  }
}

export interface Todo {
  id: string
  title: string
  completed: boolean
}

export type TodoId = Pick<Todo, 'id'>
export type TodoTitle = Pick<Todo, 'title'>
export type TodoCompleted = Pick<Todo, 'completed'>

export type FilterValue = typeof TODO_FILTERS[keyof typeof TODO_FILTERS]

export interface ApiResponse {
  task: Todo
  message: string
  success: boolean
}

interface ApiError {
  status: number
  data: {
    detail: string
  }
}

export interface User { id: string, username: string, password: string }
