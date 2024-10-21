import { GRID_SIZE } from '@/constants/game'
import { Difficulty } from '@prisma/client'

export const getInitialRevealedSquares = (difficulty: Difficulty) => {
  switch (difficulty) {
    case Difficulty.EASY:
      return 3
    case Difficulty.MEDIUM:
      return 2
    case Difficulty.HARD:
      return 1
    default:
      return 3 // Default to easy
  }
}

export const newRevealedSquares = (initialSquares: number) => {
  const squares: number[] = []

  for (let i = 0; i < initialSquares; i++) {
    let newSquare

    do {
      newSquare = Math.floor(Math.random() * (GRID_SIZE * GRID_SIZE))
    } while (squares.includes(newSquare))

    squares.push(newSquare)
  }

  return squares
}
