import axiosInstance from './axios'
import type { TodoTitle, Todo, TodoId } from '../types'

export async function getTodos (): Promise<Todo[]> {
  try {
    const response = await axiosInstance.get('')

    return response.data
  } catch (error) {
    console.log(error)
    return []
  }
}

export async function createTodo ({ title }: TodoTitle): Promise<Todo> {
  try {
    const response = await axiosInstance.post('', { title })

    return response.data
  } catch (error) {
    console.log(error)
    return { id: '', title: '', completed: false }
  }
}

export async function deleteTodo ({ id }: TodoId): Promise<void> {
  try {
    await axiosInstance.delete(`/eliminar/${id}`)
  } catch (error) {
    console.log(error)
  }
}

export async function deleteAllCompleted (): Promise<void> {
  try {
    await axiosInstance.delete('/eliminar-completadas')
  } catch (error) {
    console.log(error)
  }
}

export async function completeTodo ({ id }: TodoId): Promise<void> {
  try {
    await axiosInstance.patch(`/completar/${id}`)
  } catch (error) {
    console.log(error)
  }
}
