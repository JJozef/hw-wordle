import { Difficulty } from '@prisma/client'

type LabelType = 'Difficulty'

const labels = {
  Difficulty: {
    [Difficulty.EASY]: 'Easy',
    [Difficulty.MEDIUM]: 'Medium',
    [Difficulty.HARD]: 'Hard'
  }
} as const

type Labels = typeof labels
type LabelValues<T extends LabelType> = keyof Labels[T]

type LabelReturnMap = {
  [K in LabelType]: Labels[K][keyof Labels[K]] | 'Unknown'
}

export function getEnumLabel<T extends LabelType>(
  type: T,
  value: LabelValues<T> | null | undefined
): LabelReturnMap[T] {
  if (value === null || value === undefined) {
    return 'Unknown' as LabelReturnMap[T]
  }

  const labelMap = labels[type]
  const result = labelMap[value as keyof typeof labelMap]

  return (typeof result === 'string' ? result : 'Unknown') as LabelReturnMap[T]
}
