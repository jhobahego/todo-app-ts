import { LoginIcon } from '@/components/icons/LoginIcon'
import { LogoutIcon } from '@/components/icons/LogoutIcon'
import AuthContext from '@/context/AuthContext'
import { useSession } from '@/hooks/useSession'
import React, { useContext, useState } from 'react'

import Modal from 'react-modal'
import { toast } from 'sonner'

Modal.setAppElement('#root')

export function AuthModal () {
  const { signIn, signUp } = useSession()
  const { isLogin, setIsLogin } = useContext(AuthContext)

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    repeatPassword: ''
  })

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

    if (register && formData.password !== formData.repeatPassword) {
      toast.error('Las contraseñas no coinciden')
      return
    }

    const authFunction = isSignIn ? signIn : signUp
    authFunction(formData)
      .then((data) => {
        if (data !== undefined) {
          if (isSignIn && typeof data === 'string') {
            localStorage.setItem('token', data)
            toast.success('Usuario logueado correctamente')
            return
          }

          signIn(formData).then((data) => {
            localStorage.setItem('token', data)
            toast.success('Usuario registrado correctamente')
          }).catch((error) => { console.log(error) })

          setRegister(false)
        }
      })
      .catch((error) => {
        console.log(error)
      })

    handleCloseModal()
    setFormData({
      username: '',
      password: '',
      repeatPassword: ''
    })
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value
    })
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
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {register && (
              <input
                type="password"
                placeholder="Repeat Password"
                name="repeatPassword"
                value={formData.repeatPassword}
                onChange={handleChange}
              />
            )}

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
