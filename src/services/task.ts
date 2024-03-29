import axiosInstance from './axios'
import type { Todo, TodoId, ApiResponse, TodoTitle } from '../types'
import { type AxiosResponse } from 'axios'

export async function getTodos (): Promise<AxiosResponse<Todo[]>> {
  return await axiosInstance.get('/api/tareas')
}

export async function getUserTodos ({ token }: { token: string }): Promise<AxiosResponse<Todo[]>> {
  return await axiosInstance.get('/api/tareas/me', { headers: { Authorization: `Bearer ${token}` } })
}

export async function createTodo ({ title }: TodoTitle): Promise<AxiosResponse<ApiResponse>> {
  const token = localStorage.getItem('token') ?? ''
  return await axiosInstance.post('/api/tareas', { title }, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } })
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
