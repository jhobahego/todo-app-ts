import { type Todo as Props } from '../types'

export const Todo: React.FC<Props> = ({ id, title, completed }) => {
  return (
    <>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={completed}
          onChange={() => {}}
        />
      </div>
      <label>{title}</label>
      <button
        className='destroy'
        onClick={() => {}}
        >eliminar
      </button>
    </>
  )
}
