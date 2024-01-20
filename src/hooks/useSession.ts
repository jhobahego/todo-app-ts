import { login, register } from '../services/user'

export const useSession = (): {
  signIn: ({ username, password }: { username: string, password: string }) => Promise<string>
  signUp: ({ username, password }: { username: string, password: string }) => Promise<{ id: string, username: string, password: string }>
} => {
  const signIn = async ({ username, password }: { username: string, password: string }) => {
    const { data } = await login({ username, password })

    return data.access_token
  }

  const signUp = async ({ username, password }: { username: string, password: string }) => {
    const { data } = await register({ username, password })

    return data
  }

  return {
    signIn,
    signUp
  }
}
