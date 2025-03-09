import { LoginIcon } from '@/components/icons/LoginIcon'
import { LogoutIcon } from '@/components/icons/LogoutIcon'
import AuthContext from '@/context/AuthContext'
import { useSession } from '@/hooks/useSession'
import React, { useContext, useState } from 'react'
import Spinner from '@/components/Spinner'
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
  const [loading, setLoading] = useState(false)

  const handleOpenModal = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    if (loading) return // Keep this check to prevent closing during API calls

    setLogin(!isLogin)
    setRegister(false)
    setShowModal(false)
    setFormData({
      username: '',
      password: '',
      repeatPassword: ''
    })
  }

  const handleAuth = (event: React.MouseEvent<HTMLButtonElement>, isSignIn: boolean) => {
    event.preventDefault()

    if (register && formData.password !== formData.repeatPassword) {
      toast.error('Las contraseñas no coinciden')
      return
    }

    setLoading(true)

    const authFunction = isSignIn ? signIn : signUp
    authFunction(formData)
      .then((data) => {
        if (data === null || data === undefined) {
          setLoading(false)
          return
        }

        if (isSignIn && typeof data === 'string') {
          localStorage.setItem('token', data)
          toast.success('Usuario logueado correctamente')
          setLoading(false)
          handleCloseModal()
          return
        }

        // Handle signup success with automatic login
        signIn(formData)
          .then((loginData) => {
            if (loginData.length > 0) {
              localStorage.setItem('token', loginData)
              toast.success('Usuario registrado correctamente')
              setLoading(false)
              handleCloseModal()
            } else {
              // Handle case when login after signup fails
              toast.error('Registro exitoso pero no se pudo iniciar sesión automáticamente')
              setLoading(false)
            }
          })
          .catch((error) => {
            console.log(error)
            setLoading(false)
          })

        setRegister(false)
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
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
            disabled={loading}
          >
            X
          </button>
          <form
            className='authForm'
          >
            {loading
              ? (
                <div className="spinnerContainer">
                  <div className="loadingContent">
                    <span className="loadingText">Cargando</span>
                    <Spinner size="medium" color="primary" />
                  </div>
                </div>
                )
              : (
                <>
                  <input
                    type="text"
                    placeholder="nombre de usuario"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    disabled={loading}
                  />
                  <input
                    type="password"
                    placeholder="Contraseña"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={loading}
                  />
                  {register && (
                    <input
                      type="password"
                      placeholder="Repite contraseña"
                      name="repeatPassword"
                      value={formData.repeatPassword}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  )}

                  {login &&
                    <button
                      className='loginBtn'
                      type="submit"
                      onClick={(event) => {
                        handleAuth(event, true)
                      }}
                      disabled={loading}
                    >
                      Iniciar sesión
                    </button>
                  }

                  {!register && (
                    <button
                      className='changeAuthBtn'
                      type="submit"
                      onClick={() => { changeAuth() }}
                      disabled={loading}
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
                      disabled={loading}
                    >
                      Registrarse
                    </button>
                  )}
                </>
                )}
          </form>
        </div>
      </Modal>
    </section>
  )
}
