import React from 'react'

interface AuthFormProps {
  formData: {
    username: string
    password: string
    repeatPassword: string
  }
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleAuth: (event: React.MouseEvent<HTMLButtonElement>, isSignIn: boolean) => void
  changeAuth: () => void
  register: boolean
  login: boolean
  loading: boolean
}

export const AuthForm: React.FC<AuthFormProps> = ({
  formData,
  handleChange,
  handleAuth,
  changeAuth,
  register,
  login,
  loading
}) => {
  return (
    <>
      <form className='authForm'>
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

        {login && (
          <button
            className='loginBtn'
            type="submit"
            onClick={(event) => { handleAuth(event, true) }}
            disabled={loading}
          >
            Iniciar sesión
          </button>
        )}

        {!register && (
          <button
            className='changeAuthBtn'
            type="submit"
            onClick={changeAuth}
            disabled={loading}
          >
            ¿Aun no te has registrado?
          </button>
        )}

        {register && (
          <button
            className='registerBtn'
            type="submit"
            onClick={(event) => { handleAuth(event, false) }}
            disabled={loading}
          >
            Registrarse
          </button>
        )}
      </form>
    </>
  )
}

export default AuthForm
