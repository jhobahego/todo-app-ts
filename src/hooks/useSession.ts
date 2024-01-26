import { useContext } from 'react'
import { login, register } from '@/services/user'
import { type User } from '@/types'
import { type AxiosError } from 'axios'
import { toast } from 'sonner'

import AuthContext from '@/context/AuthContext'

export const useSession = (): {
  signIn: ({ username, password }: { username: string, password: string }) => Promise<string>
  signUp: ({ username, password }: { username: string, password: string }) => Promise<User | undefined>
} => {
  const { setIsLogin } = useContext(AuthContext)

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
    signUp
  }
}
