import { useEffect, useState } from 'react'
import { getProfile, login, register } from '@/services/user'
import { type User } from '@/types'
import { type AxiosError } from 'axios'
import { toast } from 'sonner'

export const useSession = (): {
  signIn: ({ username, password }: { username: string, password: string }) => Promise<string>
  signUp: ({ username, password }: { username: string, password: string }) => Promise<User | undefined>
  setIsLogin: (isLogin: boolean) => void
  isLogin: boolean
} => {
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token') ?? ''

    getProfile({ token }).then((data) => {
      console.log({ token: data })
      setIsLogin(true)
    }).catch((error) => {
      const { status } = error.response
      if (status === 401) {
        localStorage.removeItem('token')
        setIsLogin(false)
      }
    })
  }, [])

  const signIn = async ({ username, password }: { username: string, password: string }) => {
    try {
      const { data } = await login({ username, password })

      setIsLogin(true)
      return data.access_token
    } catch (error) {
      const { status, data } = (error as AxiosError)?.response as { status: number, data: { detail: string } }
      console.log({ status, data })
      if (status === 422) {
        toast.error('Debe proporcionar un usuario y contraseña validos')
        return
      }
      toast.error(data.detail)
    }
  }

  const signUp = async ({ username, password }: { username: string, password: string }) => {
    try {
      const { data } = await register({ username, password })

      return data as User
    } catch (error) {
      const { status, data } = (error as AxiosError)?.response as { status: number, data: { detail: string } }
      if (status === 422) {
        toast.error('Debe proporcionar un usuario y contraseña validos')
        return
      }
      toast.error(data.detail)
    }
  }

  return {
    signIn,
    signUp,
    setIsLogin,
    isLogin
  }
}
