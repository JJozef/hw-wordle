'use client'

import { Check, Share2 } from 'lucide-react'
import { useCopyToClipboard } from '@/hooks/use-copy'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'

const ShareLinkGame = ({ gameId }: { gameId: string }) => {
  const { copied, copyToClipboard } = useCopyToClipboard()

  return (
    <Tooltip disableHoverableContent>
      <TooltipTrigger
        className='size-auto rounded-lg border border-primary/50 p-1 hover:bg-primary/20 hover:backdrop-blur-md disabled:border-primary/30 disabled:bg-primary/10'
        onClick={() => copyToClipboard(`${window.location.origin}/${gameId}`)}
        disabled={copied}
      >
        {!copied ? <Share2 className='size-4' /> : <Check className='size-4' />}
      </TooltipTrigger>
      <TooltipContent
        className='max-w-36 border border-primary/30 bg-primary/10 text-center backdrop-blur-md'
        side='bottom'
        sideOffset={5}
      >
        <p>Share this game with your friends!</p>
      </TooltipContent>
    </Tooltip>
  )
}

export { ShareLinkGame }
