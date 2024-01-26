import { getProfile } from '@/services/user'
import { createContext, useEffect, useState } from 'react'

interface AuthContextProps {
  isLogin: boolean
  setIsLogin: (value: boolean) => void
}

const AuthContext = createContext<AuthContextProps>({
  isLogin: false,
  setIsLogin: () => {}
})

export function AuthContextProvider ({ children }: { children: React.ReactNode }) {
  const [isLogin, setIsLogin] = useState(false) // Lo que pense es que esto siempre lo setea a false
  const [jwt, setJwt] = useState(() => localStorage.getItem('token'))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log({ token: jwt })
    if (jwt == null) {
      setIsLogin(false)
      setLoading(false)
      return
    }
    getProfile({ token: jwt }).then((data) => {
      const { status } = data
      if (status === 200) {
        console.log(typeof status, status)
        setIsLogin(true)
      }
    }).catch((error) => {
      const { status } = error.response
      if (status === 401) {
        setIsLogin(false)
        setJwt(null)
        localStorage.removeItem('token')
      }
    }).finally(() => {
      setLoading(false)
    })
  }, [jwt]) // Si queres guardo subo a git y te paso el repo

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <AuthContext.Provider value={{ isLogin, setIsLogin }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
