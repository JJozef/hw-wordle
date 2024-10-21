'use server'

import { cache } from 'react'
import { Game } from '@prisma/client'
import { headers } from 'next/headers'
import { db } from '@/server/db'

export const getHistotyGames = cache(async (): Promise<Game[] | null> => {
  const userIp = headers().get('x-forwarded-for') || 'anonymous011'

  try {
    const game = await db.game.findMany({
      where: {
        playerId: userIp
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 10
    })

    return game
  } catch (error) {
    console.error(error)

    return null
  }
})
