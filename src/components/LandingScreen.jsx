import Button from './Button'
import Footer from './Footer'

export default function LandingScreen({ onStart }) {
  return (
    <div className="flex-1 flex flex-col min-h-screen">
      {/* Main content - centered */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {/* Floating heart */}
        <div className="mb-10 animate-heart-float">
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute inset-0 blur-2xl opacity-40">
              <svg
                width="72"
                height="72"
                viewBox="0 0 24 24"
                fill="var(--color-accent)"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
            {/* Heart icon */}
            <svg
              width="72"
              height="72"
              viewBox="0 0 24 24"
              fill="var(--color-accent)"
              className="relative"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-10 stagger-children">
          <h1 className="text-[clamp(2rem,8vw,3.5rem)] font-semibold tracking-tight text-gradient mb-4">
            Project Valentine
          </h1>
          <p className="text-lg sm:text-xl text-[var(--color-text-secondary)] tracking-tight">
            Are you actually compatible?
          </p>
        </div>

        {/* CTA */}
        <div className="animate-fade-in-up mb-12" style={{ animationDelay: '200ms' }}>
          <Button onClick={onStart} size="large" className="min-w-[180px]">
            Start Test
          </Button>
        </div>

        {/* Info */}
        <p
          className="text-[13px] text-[var(--color-text-muted)] text-center max-w-xs animate-fade-in"
          style={{ animationDelay: '400ms' }}
        >
          Both partners answer 10 questions separately, then discover your compatibility score together.
        </p>
      </div>

      {/* Footer - stays at bottom */}
      <Footer />
    </div>
  )
}
