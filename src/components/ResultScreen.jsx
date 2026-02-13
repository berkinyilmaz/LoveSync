import { useState, useEffect, useMemo, useRef } from 'react'
import { calculateCompatibility, getScoreMessage } from '../utils/compatibility'
import Button from './Button'
import ShareCard from './ShareCard'
import Footer from './Footer'
import Confetti from './Confetti'
import RadarChart from './RadarChart'
import { playSuccess, playCelebration } from '../utils/sounds'

export default function ResultScreen({ answersA, answersB, onReset }) {
  const [showShareCard, setShowShareCard] = useState(false)
  const [displayScore, setDisplayScore] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const hasAnimated = useRef(false)

  // Memoize results to prevent recalculation on every render
  const results = useMemo(
    () => calculateCompatibility(answersA, answersB),
    [answersA, answersB]
  )

  // Animated counter effect - runs only once
  useEffect(() => {
    if (!results || hasAnimated.current) return
    hasAnimated.current = true

    const target = results.totalScore
    const duration = 1200
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function for smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(eased * target)

      setDisplayScore(current)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        // Play sound and trigger confetti for high scores
        if (target >= 70) {
          playCelebration()
          setShowConfetti(true)
          setTimeout(() => setShowConfetti(false), 3500)
        } else {
          playSuccess()
        }
      }
    }

    requestAnimationFrame(animate)
  }, [results])

  if (!results) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-[var(--color-text-secondary)]">No results available</p>
      </div>
    )
  }

  const { totalScore, alignments, differences, improvements, categoryScores } = results

  return (
    <div className="flex-1 flex flex-col">
      {/* Confetti for high scores */}
      <Confetti active={showConfetti} duration={3500} />

      <div className="flex-1 px-6 py-10 max-w-lg mx-auto w-full overflow-y-auto">
        {/* Score Display */}
        <div className="text-center mb-8 animate-fade-in">
          {/* Score circle */}
          <div className="relative inline-flex items-center justify-center mb-6">
            {/* Glow */}
            <div
              className="absolute inset-0 rounded-full blur-3xl opacity-30"
              style={{ background: 'var(--color-accent)' }}
            />
            {/* Ring */}
            <div
              className="relative w-36 h-36 rounded-full flex items-center justify-center"
              style={{
                background: 'var(--color-accent-softer)',
                boxShadow: 'var(--shadow-glow-strong)',
              }}
            >
              <div className="text-center">
                <span className="text-5xl font-semibold tracking-tight text-gradient-accent">
                  {displayScore}
                </span>
                <span className="text-2xl text-[var(--color-accent)] ml-0.5">%</span>
              </div>
            </div>
          </div>

          <h1 className="text-xl font-semibold tracking-tight text-[var(--color-text-primary)] mb-2">
            Compatibility Score
          </h1>
          <p className="text-[15px] text-[var(--color-text-secondary)]">
            {getScoreMessage(totalScore)}
          </p>
        </div>

        {/* Radar Chart */}
        {categoryScores.length > 0 && (
          <div className="flex justify-center mb-10 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <RadarChart data={categoryScores} size={300} />
          </div>
        )}

        {/* Sections */}
        <div className="space-y-8">
          {/* Alignments */}
          {alignments.length > 0 && (
            <Section
              title="You both agree on"
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              }
              delay={200}
            >
              <div className="space-y-2">
                {alignments.slice(0, 5).map((item, index) => (
                  <ResultItem key={index} variant="alignment">
                    <span className="font-medium text-[var(--color-text-primary)]">{item.category}</span>
                    <span className="text-[var(--color-text-muted)]"> · </span>
                    <span className="text-[var(--color-text-secondary)]">{item.detail}</span>
                  </ResultItem>
                ))}
              </div>
            </Section>
          )}

          {/* Differences */}
          {differences.length > 0 && (
            <Section
              title="You see differently"
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f5a623" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              }
              delay={300}
            >
              <div className="space-y-2">
                {differences.map((item, index) => (
                  <ResultItem key={index} variant="difference">
                    <div className="flex flex-col gap-1">
                      <span className="font-medium text-[var(--color-text-primary)]">{item.category}</span>
                      <div className="flex gap-2 text-[13px]">
                        <span className="px-2 py-1 rounded-md bg-[var(--color-surface-elevated)] text-[var(--color-text-secondary)]">
                          A: {item.personA}
                        </span>
                        <span className="px-2 py-1 rounded-md bg-[var(--color-surface-elevated)] text-[var(--color-text-secondary)]">
                          B: {item.personB}
                        </span>
                      </div>
                    </div>
                  </ResultItem>
                ))}
              </div>
            </Section>
          )}

          {/* Improvements */}
          {improvements.length > 0 && (
            <Section
              title="What to improve together"
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
              }
              delay={400}
            >
              <div className="space-y-2">
                {improvements.slice(0, 3).map((suggestion, index) => (
                  <ResultItem key={index} variant="improvement">
                    <p className="text-[14px] text-[var(--color-text-secondary)] leading-relaxed">
                      {suggestion}
                    </p>
                  </ResultItem>
                ))}
              </div>
            </Section>
          )}
        </div>

        {/* Actions */}
        <div className="mt-12 space-y-3 animate-fade-in-up" style={{ animationDelay: '500ms' }}>
          <Button
            onClick={() => setShowShareCard(true)}
            className="w-full"
            size="large"
          >
            Share Results
          </Button>
          <Button
            onClick={onReset}
            variant="ghost"
            className="w-full"
            size="default"
          >
            Start Over
          </Button>
        </div>
      </div>

      <Footer />

      {/* Share Modal */}
      {showShareCard && (
        <ShareCard
          score={totalScore}
          message={getScoreMessage(totalScore)}
          categoryScores={categoryScores}
          onClose={() => setShowShareCard(false)}
        />
      )}
    </div>
  )
}

function Section({ title, icon, children, delay = 0 }) {
  return (
    <div
      className="animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h2 className="text-[15px] font-medium text-[var(--color-text-primary)] tracking-tight">
          {title}
        </h2>
      </div>
      {children}
    </div>
  )
}

function ResultItem({ children, variant }) {
  return (
    <div
      className={`
        p-4 rounded-[var(--radius-md)]
        border border-[var(--color-border)]
        bg-[var(--color-surface)]
      `}
    >
      {children}
    </div>
  )
}
