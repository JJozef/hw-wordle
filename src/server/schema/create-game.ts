import { z } from 'zod'

export const createGameSchema = z.object({
  apiKey: z
    .string()
    .min(4, { message: 'API Key is required' })
    .startsWith('sk-', { message: 'API Key must start with "sk-"' })
})
