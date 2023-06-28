import axiosInstance from './axios'
import { type TodoTitle, type Todo } from '../types'

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
