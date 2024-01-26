import { LoginIcon } from '@/components/icons/LoginIcon'
import { LogoutIcon } from '@/components/icons/LogoutIcon'
import AuthContext from '@/context/AuthContext'
import { useSession } from '@/hooks/useSession'
import { useContext, useState } from 'react'

import Modal from 'react-modal'
import { toast } from 'sonner'

Modal.setAppElement('#root')

export function AuthModal () {
  const { signIn, signUp } = useSession()
  const { isLogin, setIsLogin } = useContext(AuthContext)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [register, setRegister] = useState(false)
  const [login, setLogin] = useState(!isLogin)

  const [showModal, setShowModal] = useState(false)

  const handleOpenModal = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setLogin(!isLogin)
    setRegister(false)
    setShowModal(false)
  }

  const handleAuth = (event: React.MouseEvent<HTMLButtonElement>, isSignIn: boolean) => {
    event.preventDefault()

    const authFunction = isSignIn ? signIn : signUp
    authFunction({ username, password })
      .then((data) => {
        if (data !== undefined) { // Validación ya que nunca entra al catch, eso ya lo hace el useSession
          if (isSignIn && typeof data === 'string') {
            localStorage.setItem('token', data)
            toast.success('Usuario logueado correctamente')
            return
          }

          signIn({ username, password }).then((data) => {
            localStorage.setItem('token', data)
            toast.success('Usuario registrado correctamente')
          }).catch((error) => { console.log(error) })
          setRegister(false)
        }
      }).catch((error) => {
        console.log(error)
      })

    handleCloseModal()
    setUsername('')
    setPassword('')
  }

  const handledUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
  }

  const handledPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const changeAuth = () => {
    setRegister(!register)
    setLogin(!login)
  }

  const handleCloseSession = () => {
    localStorage.removeItem('token')
    setLogin(true)
    setRegister(false)
    setIsLogin(false)
  }

  const customStyles = {
    content: {
      maxWidth: '400px',
      height: '450px',
      margin: 'auto',
      zIndex: 1000,
      background: 'linear-gradient(90deg, rgba(245,245,245,1) 0%, rgba(246,246,246,1) 49%, rgba(255,255,255,1) 100%)'
    }
  }

  return (
    <section>
      {isLogin && (
        <button className='closeSession' onClick={handleCloseSession}>
          Cerrar sesión
          <LogoutIcon />
        </button>
      )}
      {!isLogin && (
        <div className='openSession'>
          <span>Logueate, deja tu huella ❤</span>
          <button onClick={handleOpenModal}>
            <LoginIcon />
          </button>
        </div>
      )}
      <Modal isOpen={showModal} style={customStyles}>
        <div className='authFormContainer'>
          <h1 className='formTitle'>
            {login ? 'Iniciar sesión' : 'Registrarse'}
          </h1>
          <button
            className='closeModalBtn'
            onClick={handleCloseModal}
          >
            X
          </button>
          <form
            className='authForm'
          >
            <input
              type="text"
              placeholder="Email"
              onChange={handledUsername}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={handledPassword}
            />

            {login &&
              <button
                className='loginBtn'
                type="submit"
                onClick={(event) => {
                  handleAuth(event, true)
                }}
              >
                Iniciar sesión
              </button>
            }

            {!register && (
              <button
                className='changeAuthBtn'
                type="submit"
                onClick={() => { changeAuth() }}
              >
                ¿Aun no te has registrado?
              </button>
            )}

            {register && (
              <button
                className='registerBtn'
                type="submit"
                onClick={(event) => {
                  handleAuth(event, false)
                }}
              >
                Registrarse
              </button>
            )}
          </form>
        </div>
      </Modal>
    </section>
  )
}
