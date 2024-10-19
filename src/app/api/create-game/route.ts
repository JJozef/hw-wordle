import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { parseRequestBody } from '@/lib/api/utils'
import { createGameSchema } from '@/server/schema/create-game'
import { uploadImageWithRandomLetters } from '@/server/actions/util/upload-claudinary-image'
import { prompt, promptImage, systemCreateGame } from '@/constants/prompt'
import { handleAndReturnErrorResponse, HWWGAMEApiError } from '@/lib/api/errors'
import { db } from '@/server/db'
import OpenAI from 'openai'

export const maxDuration = 30
export const preferredRegion = 'auto'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.fixedWindow(10, '1h')
})

export const POST = async (req: NextRequest) => {
  try {
    const ip = headers().get('x-forwarded-for') || 'anonymous011'

    const limit = await ratelimit.limit(ip)

    if (!limit.success) {
      throw new HWWGAMEApiError({
        code: 'rate_limit_exceeded',
        message: 'Rate limit exceeded'
      })
    }

    const { apiKey } = createGameSchema.parse(await parseRequestBody(req))

    if (!apiKey) {
      throw new HWWGAMEApiError({
        code: 'bad_request',
        message: 'API Key is required'
      })
    }

    const openai = new OpenAI({ apiKey })

    const wordResult = await openai.chat.completions.create({
      model: 'gpt-4-1106-preview',
      messages: [
        { role: 'system', content: systemCreateGame },
        { role: 'user', content: prompt }
      ]
    })

    const word = wordResult.choices[0]?.message?.content
    if (!word) {
      throw new HWWGAMEApiError({
        code: 'internal_server_error',
        message: 'Failed to generate word'
      })
    }

    const imageResult = await openai.images.generate({
      model: 'dall-e-3',
      prompt: promptImage(word),
      quality: 'standard',
      n: 1,
      response_format: 'url'
    })

    const imageUrl = imageResult.data[0]?.url
    if (!imageUrl) {
      throw new HWWGAMEApiError({
        code: 'internal_server_error',
        message: 'Failed to generate image'
      })
    }

    const uploadedImage = await uploadImageWithRandomLetters(imageUrl, word)
    if (!uploadedImage) {
      throw new HWWGAMEApiError({
        code: 'internal_server_error',
        message: 'Failed to upload image'
      })
    }

    const createdGame = await db.game.create({
      data: {
        word,
        image: uploadedImage.secure_url,
        wordLength: word.length
      }
    })

    if (!createdGame) {
      throw new HWWGAMEApiError({
        code: 'internal_server_error',
        message: 'Failed to create game in database'
      })
    }

    return NextResponse.json(
      {
        message: 'Game created successfully',
        gameId: createdGame.id
      },
      { status: 200 }
    )
  } catch (error) {
    return handleAndReturnErrorResponse(error)
  }
}
