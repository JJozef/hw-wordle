import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Page404() {
  return (
    <main className='z-10 flex min-h-dvh items-center justify-center'>
      <div className='flex flex-col items-center justify-center gap-8 p-4 duration-300 animate-in fade-in-5 slide-in-from-bottom-10 md:gap-14 md:p-8'>
        <div className='mx-auto max-w-prose text-center'>
          <h1
            className='mb-4 font-creepster text-9xl text-primary'
            aria-label='404 Error'
          >
            404
          </h1>
          <p className='font-mono text-base text-primary-foreground md:text-lg'>
            Oops! The spooky route you were looking for seems to have vanished
            into thin air. Let's guide you back to safety!
          </p>
        </div>

        <Button
          className='rounded-full transition-all duration-300 hover:rotate-3 active:rotate-3 active:scale-105'
          asChild
        >
          <Link href='/'>
            <span className='sr-only'>Navigate to</span>
            Back to safety!
          </Link>
        </Button>
      </div>
    </main>
  )
}
