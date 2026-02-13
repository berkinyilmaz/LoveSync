import Button from './Button'
import Card from './Card'
import Footer from './Footer'

export default function PersonSelection({ onSelectPerson, completedPersons }) {
  const personACompleted = completedPersons.includes('A')
  const personBCompleted = completedPersons.includes('B')
  const bothCompleted = personACompleted && personBCompleted

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm stagger-children">
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-gradient mb-3">
              Who's taking the test?
            </h2>
            <p className="text-[15px] text-[var(--color-text-secondary)]">
              {bothCompleted
                ? 'Both partners have completed the test'
                : 'Each person answers separately'}
            </p>
          </div>

          {/* Person Cards */}
          <div className="space-y-3 mb-8">
            <PersonCard
              label="Person A"
              completed={personACompleted}
              onClick={() => onSelectPerson('A')}
            />
            <PersonCard
              label="Person B"
              completed={personBCompleted}
              onClick={() => onSelectPerson('B')}
            />
          </div>

          {/* View Results Button */}
          {bothCompleted && (
            <div className="animate-fade-in-up">
              <Button
                onClick={() => onSelectPerson('results')}
                size="large"
                className="w-full"
              >
                View Results
              </Button>
            </div>
          )}

          {/* Status hint */}
          {!bothCompleted && (personACompleted || personBCompleted) && (
            <p className="text-center text-[13px] text-[var(--color-text-muted)] animate-fade-in">
              Waiting for {personACompleted ? 'Person B' : 'Person A'} to complete
            </p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}

function PersonCard({ label, completed, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full p-5 rounded-[var(--radius-lg)]
        border transition-all duration-200 ease-[cubic-bezier(0.25,1,0.5,1)]
        text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]
        active:scale-[0.98]
        ${completed
          ? 'bg-[var(--color-success-soft)] border-[var(--color-success)]/20'
          : 'bg-[var(--color-surface-elevated)] border-[var(--color-border)] hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-border-focus)]'}
      `}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Avatar circle */}
          <div className={`
            w-10 h-10 rounded-full flex items-center justify-center
            ${completed
              ? 'bg-[var(--color-success)]/20'
              : 'bg-[var(--color-surface-hover)]'}
          `}>
            {completed ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="1.5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            )}
          </div>

          {/* Label */}
          <div>
            <p className="font-medium text-[var(--color-text-primary)]">{label}</p>
            <p className="text-[13px] text-[var(--color-text-muted)]">
              {completed ? 'Completed' : 'Tap to start'}
            </p>
          </div>
        </div>

        {/* Arrow */}
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--color-text-muted)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </div>
    </button>
  )
}
