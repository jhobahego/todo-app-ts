import axios, { type AxiosInstance } from 'axios'

const BASE_URL = 'http://localhost:8080/api/tareas'

const axiosIntance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
    Accept: 'application/json'
  }
})

export default axiosIntance
