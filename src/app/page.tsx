import { StartGame } from '@/components/create-game/start-game'
import { CreatedBy } from '@/components/created-by'
import { getHistotyGames } from '@/server/actions/get-history-game'
import { Ghost, Skull, Candy } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <main className='relative z-10 min-h-dvh overflow-hidden transition-colors duration-500'>
      <CreatedBy />

      <section className='flex min-h-screen flex-col items-center justify-center p-4'>
        <div className='w-full max-w-lg rounded-xl border border-primary bg-primary/5 px-8 pt-8 shadow-2xl ring-1 ring-primary ring-offset-1 ring-offset-background backdrop-blur-md transition-all duration-300 animate-in fade-in-5 slide-in-from-bottom-10 hover:ring-primary/50 hover:ring-offset-2'>
          <div className='flex flex-col items-center gap-6 text-center transition-[height] duration-300'>
            <h1 className='animate-pulse-scale text-center font-creepster text-5xl text-primary sm:text-6xl'>
              Halloween <br /> Wordle
            </h1>
            <div className='flex justify-center space-x-4'>
              <Ghost className='h-10 w-10 animate-bounce-relax text-muted-foreground duration-1000' />
              <Skull className='h-10 w-10 animate-wiggle text-muted-foreground duration-1000' />
              <Candy className='h-10 w-10 animate-bounce-relax text-muted-foreground duration-1000' />
            </div>
            <p className='text-balance text-xl text-muted-foreground'>
              Guess the word based on the spooky image that appears
            </p>
            <StartGame />
          </div>
          <div className='mx-auto mb-5 mt-2 h-[2px] w-full max-w-44 rounded-full bg-secondary/10' />
          <div className='flex flex-col gap-2 pb-5 font-mono text-xs text-muted-foreground'>
            <div className='flex flex-col gap-1'>
              <p className='text-center'>
                <Link
                  className='hover:underline'
                  href='https://twitch.tv/midudev'
                  rel='noopener noreferrer'
                  target='_blank'
                >
                  @midudev
                </Link>{' '}
                x{' '}
                <Link
                  className='hover:underline'
                  href='https://cloudinary.com'
                  rel='noopener noreferrer'
                  target='_blank'
                >
                  @cloudinary
                </Link>{' '}
                hackathon
              </p>
              <p className='text-center'>
                Powered by{' '}
                <Link
                  className='hover:underline'
                  href='https://nextjs.org'
                  rel='noopener noreferrer'
                  target='_blank'
                >
                  Next.js
                </Link>{' '}
                and{' '}
                <Link
                  className='hover:underline'
                  href='https://platform.openai.com'
                  rel='noopener noreferrer'
                  target='_blank'
                >
                  OpenAI
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
