import { type Todo } from '../types'

interface Props {
  todos: Todo[]
}

export const Todos: React.FC<Props> = ({ todos }) => {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id} className={`${todo.completed ? 'completed' : ''}`}>{todo.title}</li>
      ))}
    </ul>
  )
}
