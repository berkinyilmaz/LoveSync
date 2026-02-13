// Simple Web Audio API sound effects
// No external files needed - generates sounds programmatically

const audioContext = typeof window !== 'undefined'
  ? new (window.AudioContext || window.webkitAudioContext)()
  : null

export function playTap() {
  if (!audioContext) return

  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()

  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)

  oscillator.frequency.value = 800
  oscillator.type = 'sine'

  gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1)

  oscillator.start(audioContext.currentTime)
  oscillator.stop(audioContext.currentTime + 0.1)
}

export function playSelect() {
  if (!audioContext) return

  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()

  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)

  oscillator.frequency.setValueAtTime(600, audioContext.currentTime)
  oscillator.frequency.exponentialRampToValueAtTime(900, audioContext.currentTime + 0.08)
  oscillator.type = 'sine'

  gainNode.gain.setValueAtTime(0.08, audioContext.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.15)

  oscillator.start(audioContext.currentTime)
  oscillator.stop(audioContext.currentTime + 0.15)
}

export function playSuccess() {
  if (!audioContext) return

  // Play a pleasant chord
  const frequencies = [523.25, 659.25, 783.99] // C5, E5, G5

  frequencies.forEach((freq, i) => {
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.frequency.value = freq
    oscillator.type = 'sine'

    const startTime = audioContext.currentTime + i * 0.05

    gainNode.gain.setValueAtTime(0, startTime)
    gainNode.gain.linearRampToValueAtTime(0.08, startTime + 0.05)
    gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + 0.8)

    oscillator.start(startTime)
    oscillator.stop(startTime + 0.8)
  })
}

export function playCelebration() {
  if (!audioContext) return

  // Ascending celebratory notes
  const notes = [523.25, 587.33, 659.25, 783.99, 880, 1046.5]

  notes.forEach((freq, i) => {
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.frequency.value = freq
    oscillator.type = 'sine'

    const startTime = audioContext.currentTime + i * 0.08

    gainNode.gain.setValueAtTime(0, startTime)
    gainNode.gain.linearRampToValueAtTime(0.06, startTime + 0.02)
    gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + 0.3)

    oscillator.start(startTime)
    oscillator.stop(startTime + 0.3)
  })
}

// Resume audio context on user interaction (required by browsers)
export function initAudio() {
  if (audioContext && audioContext.state === 'suspended') {
    audioContext.resume()
  }
}
