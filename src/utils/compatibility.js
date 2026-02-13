import { questions, categoryLabels } from '../data/questions'

export function calculateCompatibility(answersA, answersB) {
  if (!answersA || !answersB || Object.keys(answersA).length === 0 || Object.keys(answersB).length === 0) {
    return null
  }

  const results = {
    totalScore: 0,
    alignments: [],
    differences: [],
    improvements: [],
    categoryScores: [], // For radar chart
  }

  let totalDifference = 0
  const maxDifferencePerQuestion = 3 // Max diff between values 1-4
  const categoryData = {}

  questions.forEach((question) => {
    const answerA = answersA[question.id]
    const answerB = answersB[question.id]

    if (answerA === undefined || answerB === undefined) return

    const difference = Math.abs(answerA - answerB)
    totalDifference += difference

    const categoryName = categoryLabels[question.category]
    const optionA = question.options.find(o => o.value === answerA)?.label
    const optionB = question.options.find(o => o.value === answerB)?.label

    // Track category scores
    const categoryScore = Math.round((1 - difference / maxDifferencePerQuestion) * 100)
    categoryData[question.category] = {
      label: getShortLabel(question.category),
      fullLabel: categoryName,
      score: categoryScore,
    }

    if (difference === 0) {
      // Perfect match
      results.alignments.push({
        category: categoryName,
        detail: optionA,
        question: question.question,
      })
    } else if (difference === 1) {
      // Close enough - slight difference
      results.alignments.push({
        category: categoryName,
        detail: `Similar views: ${optionA} / ${optionB}`,
        question: question.question,
      })
    } else {
      // Significant difference
      results.differences.push({
        category: categoryName,
        personA: optionA,
        personB: optionB,
        question: question.question,
      })

      // Generate improvement suggestion
      results.improvements.push(
        getImprovementSuggestion(question.category, optionA, optionB)
      )
    }
  })

  // Convert category data to array for radar chart
  results.categoryScores = Object.values(categoryData)

  // Calculate percentage (inverse of difference ratio)
  const maxTotalDifference = questions.length * maxDifferencePerQuestion
  const compatibilityRatio = 1 - (totalDifference / maxTotalDifference)
  results.totalScore = Math.round(compatibilityRatio * 100)

  return results
}

function getShortLabel(category) {
  const labels = {
    'conflict': 'Conflict',
    'love-language': 'Love',
    'weekend': 'Leisure',
    'communication': 'Comms',
    'future': 'Future',
    'social': 'Social',
    'space': 'Space',
    'decisions': 'Decisions',
    'emotions': 'Emotions',
    'growth': 'Growth',
  }
  return labels[category] || category
}

function getImprovementSuggestion(category, answerA, answerB) {
  const suggestions = {
    'conflict': `Discuss your conflict styles openly. One prefers "${answerA}" while the other prefers "${answerB}". Find a middle ground approach.`,
    'love-language': `Learn each other's love languages. Express love in ways that resonate with your partner, not just your own preference.`,
    'weekend': `Plan weekends that include both preferences. Alternate between activities or find compromises that satisfy both.`,
    'communication': `Set communication expectations together. Find a frequency that feels connected but not overwhelming for either person.`,
    'future': `Align on planning styles. Create shared goals while respecting different comfort levels with structure.`,
    'social': `Balance social time together. Communicate openly about social energy levels and plan accordingly.`,
    'space': `Respect each other's need for space. Schedule quality time AND personal time intentionally.`,
    'decisions': `Establish a decision-making framework. Know when to collaborate and when to defer to each other.`,
    'emotions': `Create emotional safety. Understand that you express feelings differently and validate each other's style.`,
    'growth': `Support each other's growth in the way they need it, not how you'd want to be supported.`,
  }

  return suggestions[category] || "Take time to understand each other's perspective on this topic."
}

export function getScoreMessage(score) {
  if (score >= 90) return "You're basically the same person!"
  if (score >= 75) return "Strong foundation for a beautiful relationship"
  if (score >= 60) return "Great compatibility with room to grow together"
  if (score >= 45) return "Different perspectives that can complement each other"
  if (score >= 30) return "Opposites attract - communication is key"
  return "Very different viewpoints - embrace the challenge!"
}

export function getScoreEmoji(score) {
  if (score >= 90) return '💕'
  if (score >= 75) return '❤️'
  if (score >= 60) return '💗'
  if (score >= 45) return '💝'
  if (score >= 30) return '💜'
  return '💫'
}
