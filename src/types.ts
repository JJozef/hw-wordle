import { Game } from '@prisma/client'

export interface GameWithWinner extends Game {
  isWinner: boolean
}
