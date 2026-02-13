import { useState } from 'react'
import { questions } from '../data/questions'
import Button from './Button'
import ProgressBar from './ProgressBar'
import { playSelect, initAudio } from '../utils/sounds'

export default function Quiz({ person, onComplete, existingAnswers }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState(existingAnswers || {})
  const [selectedOption, setSelectedOption] = useState(existingAnswers?.[questions[0]?.id] ?? null)
  const [direction, setDirection] = useState(1) // 1 = forward, -1 = backward

  const currentQuestion = questions[currentIndex]
  const isLastQuestion = currentIndex === questions.length - 1
  const progress = currentIndex + 1

  const handleOptionSelect = (value) => {
    initAudio()
    playSelect()
    setSelectedOption(value)
  }

  const handleNext = () => {
    if (selectedOption === null) return

    const newAnswers = {
      ...answers,
      [currentQuestion.id]: selectedOption,
    }
    setAnswers(newAnswers)

    if (isLastQuestion) {
      onComplete(newAnswers)
    } else {
      setDirection(1)
      setCurrentIndex(currentIndex + 1)
      setSelectedOption(newAnswers[questions[currentIndex + 1]?.id] ?? null)
    }
  }

  const handleBack = () => {
    if (currentIndex > 0) {
      setDirection(-1)
      const newAnswers = {
        ...answers,
        [currentQuestion.id]: selectedOption,
      }
      setAnswers(newAnswers)
      setCurrentIndex(currentIndex - 1)
      setSelectedOption(newAnswers[questions[currentIndex - 1]?.id] ?? null)
    }
  }

  return (
    <div className="flex-1 flex flex-col px-6 py-8 max-w-lg mx-auto w-full">
      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <div className="flex items-center justify-between mb-5">
          <span className="text-[13px] font-medium text-[var(--color-accent)] tracking-tight">
            Person {person}
          </span>
          {currentIndex > 0 && (
            <button
              onClick={handleBack}
              className="flex items-center gap-1 text-[13px] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Back
            </button>
          )}
        </div>
        <ProgressBar current={progress} total={questions.length} />
      </div>

      {/* Question */}
      <div
        key={currentQuestion.id}
        className="flex-1 flex flex-col animate-fade-in-up"
      >
        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-[var(--color-text-primary)] mb-8 leading-snug">
          {currentQuestion.question}
        </h2>

        {/* Options */}
        <div className="space-y-2.5">
          {currentQuestion.options.map((option, index) => (
            <OptionButton
              key={option.value}
              label={option.label}
              selected={selectedOption === option.value}
              onClick={() => handleOptionSelect(option.value)}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Next Button */}
      <div className="pt-8">
        <Button
          onClick={handleNext}
          disabled={selectedOption === null}
          className="w-full"
          size="large"
        >
          {isLastQuestion ? 'Complete' : 'Continue'}
        </Button>
      </div>
    </div>
  )
}

function OptionButton({ label, selected, onClick, index }) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full p-4 rounded-[var(--radius-md)] text-left
        border transition-all duration-200 ease-[cubic-bezier(0.25,1,0.5,1)]
        focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]
        active:scale-[0.98]
        ${selected
          ? 'bg-[var(--color-accent-soft)] border-[var(--color-accent)]/30 text-[var(--color-text-primary)]'
          : 'bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-elevated)] hover:border-[var(--color-border-focus)] hover:text-[var(--color-text-primary)]'}
      `}
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <span className="flex items-center gap-3">
        {/* Radio indicator */}
        <span
          className={`
            w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center flex-shrink-0
            transition-all duration-200
            ${selected
              ? 'border-[var(--color-accent)] bg-[var(--color-accent)]'
              : 'border-[var(--color-text-muted)]/50'}
          `}
        >
          {selected && (
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
          )}
        </span>
        <span className="text-[15px]">{label}</span>
      </span>
    </button>
  )
}
