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
  const [isLogin, setIsLogin] = useState(false)
  const [jwt, setJwt] = useState(() => localStorage.getItem('token'))

  useEffect(() => {
    if (jwt == null) {
      setIsLogin(false)
      return
    }

    getProfile({ token: jwt }).then(() => { setIsLogin(true) })
      .catch(() => {
        setIsLogin(false)
        localStorage.removeItem('token')
        setJwt(null)
      })
  }, [jwt])

  return (
    <AuthContext.Provider value={{ isLogin, setIsLogin }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
