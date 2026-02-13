export default function Card({ children, className = '', elevated = false, interactive = false }) {
  return (
    <div
      className={`
        rounded-[var(--radius-xl)]
        border border-[var(--color-border)]
        ${elevated
          ? 'bg-[var(--color-surface-elevated)]'
          : 'bg-[var(--color-surface)]'}
        ${interactive
          ? 'transition-all duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-border-focus)] cursor-pointer'
          : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}
