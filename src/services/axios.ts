import axios, { type AxiosInstance } from 'axios'

const BASE_URL = import.meta.env.VITE_BASE_URL

const axiosIntance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

export default axiosIntance
