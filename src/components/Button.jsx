import { playTap, initAudio } from '../utils/sounds'

export default function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'default',
  disabled = false,
  className = '',
  sound = true,
  ...props
}) {
  const handleClick = (e) => {
    initAudio()
    if (sound && !disabled) {
      playTap()
    }
    onClick?.(e)
  }
  const baseStyles = `
    relative inline-flex items-center justify-center
    font-medium tracking-tight
    transition-all duration-200 ease-[cubic-bezier(0.25,1,0.5,1)]
    focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]
    disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none
    active:scale-[0.98]
  `

  const variants = {
    primary: `
      bg-[var(--color-accent)] text-white
      hover:brightness-110
      focus-visible:ring-[var(--color-accent)]
      shadow-[0_1px_2px_rgba(0,0,0,0.3),0_4px_16px_rgba(232,64,90,0.25)]
      hover:shadow-[0_1px_2px_rgba(0,0,0,0.3),0_8px_24px_rgba(232,64,90,0.35)]
    `,
    secondary: `
      bg-[var(--color-surface-elevated)] text-[var(--color-text-primary)]
      border border-[var(--color-border)]
      hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-border-focus)]
      focus-visible:ring-white/20
    `,
    ghost: `
      text-[var(--color-text-secondary)]
      hover:text-[var(--color-text-primary)] hover:bg-white/[0.04]
      focus-visible:ring-white/20
    `,
  }

  const sizes = {
    small: 'h-9 px-4 text-sm rounded-[var(--radius-sm)]',
    default: 'h-11 px-6 text-[15px] rounded-[var(--radius-pill)]',
    large: 'h-[52px] px-8 text-base rounded-[var(--radius-pill)]',
  }

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
