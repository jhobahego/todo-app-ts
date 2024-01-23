import axiosIntance from './axios'

export const register = async ({ username, password }: { username: string, password: string }) => {
  return await axiosIntance.post('/api/users', { username, password })
}

export const login = async ({ username, password }: { username: string, password: string }) => {
  return await axiosIntance.post('/token', { username, password })
}

export const getProfile = async ({ token }: { token: string }) => {
  return await axiosIntance.get('/api/users/me', { headers: { Authorization: `Bearer ${token}` } })
}
