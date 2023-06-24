export const TODO_FILTERS = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed'
} as const

export const FILTER_BUTTONS = {
  [TODO_FILTERS.ALL]: {
    literal: 'todos',
    href: `/?filter=${TODO_FILTERS.ALL}`
  },
  [TODO_FILTERS.ACTIVE]: {
    literal: 'activos',
    href: `/?filter=${TODO_FILTERS.ACTIVE}`
  },
  [TODO_FILTERS.COMPLETED]: {
    literal: 'completados',
    href: `/?filter=${TODO_FILTERS.COMPLETED}`
  }
}
