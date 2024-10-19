import { NextRequest } from 'next/server'
import { HWWGAMEApiError } from './errors'

export const parseRequestBody = async (req: NextRequest) => {
  try {
    return await req.json()
  } catch (e) {
    throw new HWWGAMEApiError({
      code: 'bad_request',
      message:
        'Invalid JSON format in request body. Please ensure the request body is a valid JSON object.'
    })
  }
}
