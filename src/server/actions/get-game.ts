'use server'

import { cache } from 'react'
import { headers } from 'next/headers'
import { GameWithWinner } from '@/types'
import { db } from '@/server/db'

export const getGame = cache(
  async (id: string): Promise<GameWithWinner | null> => {
    if (!id) return null

    const userIp = headers().get('x-forwarded-for') || 'anonymous011'

    try {
      const game = await db.game.findUnique({
        where: { id }
      })

      if (!game) return null

      return {
        ...game,
        isWinner: game.playerId === userIp
      }
    } catch (error) {
      console.error(error)

      return null
    }
  }
)
