export default function ProgressBar({ current, total }) {
  const percentage = (current / total) * 100

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-3">
        <span className="text-[13px] text-[var(--color-text-secondary)] tracking-tight">
          Question {current} of {total}
        </span>
        <span className="text-[13px] text-[var(--color-text-muted)] tabular-nums">
          {Math.round(percentage)}%
        </span>
      </div>
      <div className="h-1 bg-[var(--color-surface-elevated)] rounded-full overflow-hidden">
        <div
          className="h-full bg-[var(--color-accent)] rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
