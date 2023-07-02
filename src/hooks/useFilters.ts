import { useState } from 'react'
import { type Todo, type FilterValue } from '../types'
import { TODO_FILTERS } from '../consts'

export const useFilters = (todos: Todo[]): {
  activeCount: number
  completedCount: number
  filterSelected: FilterValue
  handleFilterSelected: (filter: FilterValue) => void
  filteredTodos: Todo[]
} => {
  const [filterSelected, setFilterSelected] = useState<FilterValue>(TODO_FILTERS.ALL)

  const activeCount = todos.length
  const completedCount = todos.filter(todo => todo.completed).length

  const handleFilterSelected = (filter: FilterValue): void => {
    setFilterSelected(filter)
  }

  const filteredTodos = todos.filter(todo => {
    if (filterSelected === 'active' as FilterValue) return !todo.completed
    if (filterSelected === 'completed') return todo.completed
    return todo
  })

  return { activeCount, completedCount, filterSelected, handleFilterSelected, filteredTodos }
}
