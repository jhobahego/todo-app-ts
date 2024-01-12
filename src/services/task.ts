import axiosInstance from './axios'
import type { TodoTitle, Todo, TodoId, ApiResponse } from '../types'
import { type AxiosResponse } from 'axios'

export async function getTodos (): Promise<Todo[]> {
  try {
    const response = await axiosInstance.get('')

    return response.data
  } catch (error) {
    return []
  }
}

export async function createTodo ({ title }: TodoTitle): Promise<AxiosResponse<ApiResponse>> {
  return await axiosInstance.post('', { title }, { headers: { 'Content-Type': 'application/json' } })
}

export async function deleteTodo ({ id }: TodoId) {
  return await axiosInstance.delete(`/eliminar/${id}`)
}

export async function deleteAllCompleted (): Promise<void> {
  await axiosInstance.delete('/completadas')
}

export async function completeTodo ({ id }: TodoId): Promise<AxiosResponse<ApiResponse>> {
  return await axiosInstance.patch(`/completar/${id}`)
}
