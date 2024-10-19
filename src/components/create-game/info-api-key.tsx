import { Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import Link from 'next/link'

const InfoApiKey = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className='absolute inset-y-1 right-1 h-auto rounded-lg p-1'>
          <Info className='size-4' />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side='top'
        sideOffset={10}
        className='rounded-xl border border-primary bg-primary/5 backdrop-blur-lg'
      >
        <div className='flex flex-col gap-2'>
          <h5 className='text-lg font-bold text-primary'>API KEY</h5>
          <ul className='list-inside list-disc text-xs [&>*:not(:last-child)]:mb-1.5'>
            <li>
              Obtain your API Key from{' '}
              <Link
                className='font-bold hover:underline'
                href='https://platform.openai.com/api-keys'
                rel='noopener noreferrer'
                target='_blank'
              >
                OpenAI's Platform
              </Link>
            </li>
            <li>
              This key is essential for generating game content, including text
              and images using{' '}
              <Link
                className='font-bold hover:underline'
                href='https://openai.com/index/dall-e-3'
                rel='noopener noreferrer'
                target='_blank'
              >
                DALL-E
              </Link>
            </li>
            <li>
              You'll need to enter your key each time you start a new game{' '}
              <em>(temporary requirement)</em>
            </li>
            <li>
              Your key is used solely for game content generation and is not
              stored
            </li>
            <li>
              <b>Important:</b> Always delete your API key once you have
              finished having fun with our application.
            </li>
          </ul>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export { InfoApiKey }
