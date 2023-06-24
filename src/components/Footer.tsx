import { type FilterValue } from '../types'
import { Filters } from './Filters'

interface Props {
  activeCount: number
  completedCount: number
  filterSelected: FilterValue
  onFilterChange: (filter: FilterValue) => void
  onClearCompleted: () => void
}

export const Footer: React.FC<Props> = ({
  activeCount,
  completedCount,
  filterSelected,
  onFilterChange,
  onClearCompleted
}) => {
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{activeCount}</strong>Tareas pendientes
      </span>

      <Filters
        filterSelected={filterSelected}
        onFilterChange={onFilterChange}
      />

      {
        completedCount > 0 && (
          <button className='clear-completed' onClick={onClearCompleted}>Borrar completados</button>
        )
      }
    </footer>
  )
}
