/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from 'react'

interface UseCopyToClipboardResult {
  copied: boolean
  error: Error | null
  copyToClipboard: (text: string) => Promise<void>
}

const useCopyToClipboard = (
  timeoutDuration: number = 1000
): UseCopyToClipboardResult => {
  const [copied, setCopied] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  const copyToClipboard = useCallback(
    async (text: string): Promise<void> => {
      try {
        await navigator.clipboard.writeText(text)
        setCopied(true)
        setError(null)
        setTimeout(() => setCopied(false), timeoutDuration)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to copy text'))
      }
    },
    [timeoutDuration]
  )

  return { copied, error, copyToClipboard }
}

export { useCopyToClipboard }
