'use server'

import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { db } from '@/server/db'

export const saveWinGame = async ({
  gameId,
  guesses
}: {
  gameId: string
  guesses: string[]
}) => {
  try {
    const userIp = headers().get('x-forwarded-for') || 'anonymous011'
    const userCity = headers().get('x-vercel-ip-city') || 'Unknown'
    const userFlagName = headers().get('x-vercel-ip-country') || 'UKNW'

    if (!gameId) {
      throw new Error('Game ID is required')
    }

    const game = await db.game.findUnique({
      where: {
        id: gameId
      }
    })

    if (!game) {
      throw new Error('Game not found')
    }

    const lastGuess = guesses[guesses.length - 1]
    const updatedGuesses =
      lastGuess === game.word ? guesses : [...guesses, game.word]

    const updatedGame = await db.game.update({
      where: {
        id: game.id
      },
      data: {
        guessedWords: updatedGuesses,
        playerId: userIp,
        playerCountry: userCity,
        playerFlag:
          userFlagName === 'UKNW'
            ? 'UKNW'
            : `https://purecatamphetamine.github.io/country-flag-icons/3x2/${userFlagName}.svg`,
        isFinished: true
      }
    })

    if (!updatedGame) {
      throw new Error('Failed to update the game')
    }

    revalidatePath('/')
    revalidatePath(`/${game.id}`)

    return {
      status: 'success',
      message: 'You Win!'
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        status: 'error',
        message: error.message
      }
    }

    return {
      status: 'error',
      message: 'An error occurred while saving the game'
    }
  }
}
