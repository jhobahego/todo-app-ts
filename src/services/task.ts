import axiosInstance from './axios'
import type { TodoTitle, Todo, TodoId } from '../types'

export async function getTodos (): Promise<Todo[]> {
  try {
    const response = await axiosInstance.get('')

    return response.data
  } catch (error) {
    return []
  }
}

export async function createTodo ({ title }: TodoTitle) {
  return await axiosInstance.post('', { title })
}

export async function deleteTodo ({ id }: TodoId) {
  return await axiosInstance.delete(`/eliminar/${id}`)
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
