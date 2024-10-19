import { z } from 'zod'
import { NextResponse } from 'next/server'

export const ErrorCode = z.enum([
  'bad_request',
  'not_found',
  'internal_server_error',
  'unauthorized',
  'forbidden',
  'rate_limit_exceeded',
  'invite_expired',
  'invite_pending',
  'exceeded_limit',
  'conflict',
  'unprocessable_entity'
])

const errorCodeToHttpStatus: Record<z.infer<typeof ErrorCode>, number> = {
  bad_request: 400,
  unauthorized: 401,
  forbidden: 403,
  exceeded_limit: 403,
  not_found: 404,
  conflict: 409,
  invite_pending: 409,
  invite_expired: 410,
  unprocessable_entity: 422,
  rate_limit_exceeded: 429,
  internal_server_error: 500
}

export class HWWGAMEApiError extends Error {
  public readonly code: z.infer<typeof ErrorCode>
  public readonly tips?: string

  constructor({
    code,
    message,
    tips
  }: {
    code: z.infer<typeof ErrorCode>
    message: string
    tips?: string
  }) {
    super(message)
    this.code = code
    this.tips = tips || 'Please try again.'
  }
}

export function handleApiError(error: any) {
  console.error('API error occurred', error.message)

  // HWWGAMEApiError errors
  if (error instanceof HWWGAMEApiError) {
    return {
      error: {
        code: error.code,
        message: error.message,
        tips: error.tips
      },
      status: errorCodeToHttpStatus[error.code]
    }
  }

  // Prisma record not found error
  if (error.code === 'P2025') {
    return {
      error: {
        code: 'not_found',
        message:
          error?.meta?.cause ||
          error.message ||
          'The requested resource was not found.',
        tips: 'Please try again.'
      },
      status: 404
    }
  }

  if (error.code === 'invalid_api_key') {
    return {
      error: {
        code: 'unauthorized',
        message: 'Invalid API key',
        tips: 'Please try again.'
      },
      status: 401
    }
  }

  // Fallback
  // Unhandled errors are not user-facing, so we don't expose the actual error
  return {
    error: {
      code: 'internal_server_error',
      message: 'An unexpected error occurred. Please try again later.',
      tips: 'Please try again.'
    },
    status: 500
  }
}

export function handleAndReturnErrorResponse(
  err: unknown,
  headers?: Record<string, string>
) {
  const { error, status } = handleApiError(err)
  return NextResponse.json({ error }, { headers, status })
}
