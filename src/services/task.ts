import axiosInstance from './axios'
import { type Todo } from '../types'

export async function getTodos (): Promise<Todo[]> {
  try {
    const response = await axiosInstance.get('')

    return response.data
  } catch (error) {
    console.log(error)
    return []
  }
}
