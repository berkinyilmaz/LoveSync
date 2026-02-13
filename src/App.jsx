import { useState, useEffect } from 'react'
import LandingScreen from './components/LandingScreen'
import PersonSelection from './components/PersonSelection'
import Quiz from './components/Quiz'
import ResultScreen from './components/ResultScreen'

const STORAGE_KEY = 'project-valentine-data'

function App() {
  const [screen, setScreen] = useState('landing')
  const [currentPerson, setCurrentPerson] = useState(null)
  const [answersA, setAnswersA] = useState({})
  const [answersB, setAnswersB] = useState({})

  // Load saved data from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const data = JSON.parse(saved)
        if (data.answersA) setAnswersA(data.answersA)
        if (data.answersB) setAnswersB(data.answersB)
        if (Object.keys(data.answersA || {}).length > 0 || Object.keys(data.answersB || {}).length > 0) {
          setScreen('select')
        }
      }
    } catch (e) {
      console.error('Failed to load saved data:', e)
    }
  }, [])

  // Save data to localStorage whenever answers change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ answersA, answersB }))
    } catch (e) {
      console.error('Failed to save data:', e)
    }
  }, [answersA, answersB])

  const handleStart = () => {
    setScreen('select')
  }

  const handleSelectPerson = (person) => {
    if (person === 'results') {
      setScreen('results')
    } else {
      setCurrentPerson(person)
      setScreen('quiz')
    }
  }

  const handleQuizComplete = (answers) => {
    if (currentPerson === 'A') {
      setAnswersA(answers)
    } else {
      setAnswersB(answers)
    }
    setCurrentPerson(null)
    setScreen('select')
  }

  const handleReset = () => {
    setAnswersA({})
    setAnswersB({})
    setCurrentPerson(null)
    setScreen('landing')
    localStorage.removeItem(STORAGE_KEY)
  }

  const getCompletedPersons = () => {
    const completed = []
    if (Object.keys(answersA).length === 10) completed.push('A')
    if (Object.keys(answersB).length === 10) completed.push('B')
    return completed
  }

  return (
    <div className="min-h-screen min-h-[100dvh] flex flex-col">
      {screen === 'landing' && (
        <LandingScreen onStart={handleStart} />
      )}

      {screen === 'select' && (
        <PersonSelection
          onSelectPerson={handleSelectPerson}
          completedPersons={getCompletedPersons()}
        />
      )}

      {screen === 'quiz' && (
        <Quiz
          person={currentPerson}
          onComplete={handleQuizComplete}
          existingAnswers={currentPerson === 'A' ? answersA : answersB}
        />
      )}

      {screen === 'results' && (
        <ResultScreen
          answersA={answersA}
          answersB={answersB}
          onReset={handleReset}
        />
      )}
    </div>
  )
}

export default App
