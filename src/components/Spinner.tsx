const Spinner = ({ size = 'medium', color = 'primary' }) => {
  const sizeClass = {
    small: 'spinner-small',
    medium: 'spinner-medium',
    large: 'spinner-large'
  }[size] ?? 'spinner-medium'

  const colorClass = {
    primary: 'spinner-primary',
    secondary: 'spinner-secondary',
    white: 'spinner-white'
  }[color] ?? 'spinner-primary'

  return (
    <div className={`spinner ${sizeClass} ${colorClass}`} role="status">
      <span className="sr-only">Cargando...</span>
    </div>
  )
}

export default Spinner
