export default function UserName({ user, className = "" }) {
  const isAdmin = user?.role === 'ADMIN'

  return (
    <span className={`${isAdmin ? 'text-red-400 font-bold drop-shadow-lg animate-pulse' : 'text-accent'} ${className}`}>
      {user?.name || 'Anonymous'}
    </span>
  )
}
