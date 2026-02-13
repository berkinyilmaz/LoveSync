import { useRef, useState } from 'react'
import html2canvas from 'html2canvas'
import Button from './Button'

export default function ShareCard({ score, message, categoryScores = [], onClose }) {
  const cardRef = useRef(null)
  const [downloading, setDownloading] = useState(false)
  const [format, setFormat] = useState('story') // 'story' or 'square'

  const handleDownload = async () => {
    if (!cardRef.current) return

    setDownloading(true)
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 3,
        logging: false,
        useCORS: true,
      })

      const link = document.createElement('a')
      link.download = `project-valentine-${format}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch (error) {
      console.error('Failed to generate image:', error)
    } finally {
      setDownloading(false)
    }
  }

  // Get top 3 category matches
  const topCategories = [...categoryScores]
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-sm flex flex-col items-center animate-fade-in-scale">
        {/* Format Toggle */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setFormat('story')}
            className={`px-4 py-2 text-[13px] rounded-full transition-all ${
              format === 'story'
                ? 'bg-[var(--color-accent)] text-white'
                : 'bg-[var(--color-surface-elevated)] text-[var(--color-text-secondary)]'
            }`}
          >
            Story (9:16)
          </button>
          <button
            onClick={() => setFormat('square')}
            className={`px-4 py-2 text-[13px] rounded-full transition-all ${
              format === 'square'
                ? 'bg-[var(--color-accent)] text-white'
                : 'bg-[var(--color-surface-elevated)] text-[var(--color-text-secondary)]'
            }`}
          >
            Square (1:1)
          </button>
        </div>

        {/* Shareable Card */}
        <div
          ref={cardRef}
          className="rounded-[24px] overflow-hidden mb-6"
          style={{
            width: format === 'story' ? 270 : 300,
            height: format === 'story' ? 480 : 300,
            background: 'linear-gradient(165deg, #1a1a1a 0%, #0a0a0a 100%)',
          }}
        >
          <div
            className="h-full flex flex-col justify-between"
            style={{ padding: format === 'story' ? '32px 24px' : '24px' }}
          >
            {/* Header */}
            <div className="flex items-center justify-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#e8405a">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span
                style={{
                  fontSize: '14px',
                  fontWeight: '500',
                  color: 'rgba(255, 255, 255, 0.7)',
                  letterSpacing: '-0.01em',
                }}
              >
                Project Valentine
              </span>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-center">
              {/* Score */}
              <div
                className="flex items-center justify-center rounded-full mb-4"
                style={{
                  width: format === 'story' ? 120 : 100,
                  height: format === 'story' ? 120 : 100,
                  background: 'rgba(232, 64, 90, 0.1)',
                  border: '2px solid rgba(232, 64, 90, 0.25)',
                }}
              >
                <span
                  style={{
                    fontSize: format === 'story' ? '44px' : '36px',
                    fontWeight: '600',
                    color: '#e8405a',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {score}%
                </span>
              </div>

              <p
                style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: 'rgba(255, 255, 255, 0.92)',
                  marginBottom: '4px',
                  letterSpacing: '-0.02em',
                  textAlign: 'center',
                }}
              >
                Compatibility Score
              </p>
              <p
                style={{
                  fontSize: '13px',
                  color: 'rgba(255, 255, 255, 0.5)',
                  textAlign: 'center',
                  maxWidth: '200px',
                }}
              >
                {message}
              </p>

              {/* Category Pills - Only show in story format */}
              {format === 'story' && topCategories.length > 0 && (
                <div
                  className="flex flex-wrap justify-center gap-2 mt-6"
                  style={{ maxWidth: '220px' }}
                >
                  {topCategories.map((cat, i) => (
                    <div
                      key={i}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '20px',
                        background: 'rgba(255, 255, 255, 0.06)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '12px',
                          color: 'rgba(255, 255, 255, 0.6)',
                        }}
                      >
                        {cat.label}{' '}
                        <span style={{ color: '#e8405a' }}>{cat.score}%</span>
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div
              style={{
                paddingTop: '16px',
                borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                textAlign: 'center',
              }}
            >
              <p
                style={{
                  fontSize: '11px',
                  color: 'rgba(255, 255, 255, 0.3)',
                }}
              >
                projectvalentine.app
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="w-full space-y-2.5" style={{ maxWidth: 300 }}>
          <Button
            onClick={handleDownload}
            disabled={downloading}
            className="w-full"
            size="large"
          >
            {downloading ? 'Generating...' : 'Save Image'}
          </Button>
          <Button
            onClick={onClose}
            variant="ghost"
            className="w-full"
            size="default"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}
