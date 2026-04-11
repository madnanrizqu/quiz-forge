export type PerformanceTier = 'excellent' | 'good' | 'keep-practicing'

export interface PerformanceResult {
  percentage: number
  tier: PerformanceTier
  label: string
}

export function calculatePerformance(
  score: number,
  totalQuestions: number,
): PerformanceResult {
  const percentage = Math.round((score / totalQuestions) * 100)

  let tier: PerformanceTier
  let label: string

  if (percentage >= 80) {
    tier = 'excellent'
    label = 'Excellent!'
  } else if (percentage >= 60) {
    tier = 'good'
    label = 'Good Job!'
  } else {
    tier = 'keep-practicing'
    label = 'Keep Practicing'
  }

  return { percentage, tier, label }
}
