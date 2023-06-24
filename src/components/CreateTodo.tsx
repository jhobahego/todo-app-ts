import { useState } from 'react'
import { type TodoTitle } from '../types'

interface Props {
  saveTodo: ({ title }: TodoTitle) => void
}

export const CreateTodo: React.FC<Props> = ({ saveTodo }) => {
  const [inputValue, setInputValue] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault()
    setInputValue(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    saveTodo({ title: inputValue })
    setInputValue('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="new-todo"
        type="text"
        onChange={handleChange}
        value={inputValue}
        placeholder='¿Que necesitas hacer?'
        autoFocus
      />
    </form>
  )
}
