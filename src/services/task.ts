import axiosInstance from './axios'
import type { TodoTitle, Todo, TodoId, ApiResponse } from '../types'
import { type AxiosResponse } from 'axios'

export async function getTodos (): Promise<AxiosResponse<Todo[]>> {
  return await axiosInstance.get('/api/tareas')
}

export async function createTodo ({ title }: TodoTitle): Promise<AxiosResponse<ApiResponse>> {
  return await axiosInstance.post('/api/tareas', { title }, { headers: { 'Content-Type': 'application/json' } })
}

export async function deleteTodo ({ id }: TodoId) {
  return await axiosInstance.delete(`/api/tareas/eliminar/${id}`)
}

export async function deleteAllCompleted (): Promise<void> {
  await axiosInstance.delete('/api/tareas/completadas')
}

export async function completeTodo ({ id }: TodoId): Promise<AxiosResponse<ApiResponse>> {
  return await axiosInstance.patch(`/api/tareas/completar/${id}`)
}
