import { Button } from '@/components/ui/button'
import { getGame } from '@/server/actions/get-game'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { ShareLinkGame } from '@/components/share-game'
import ClientGamePage from './game.client'
import Link from 'next/link'

export default async function GameHome({
  params
}: {
  params: { game: string }
}) {
  const game = await getGame(params.game)

  if (!game) notFound()

  return (
    <section className='container relative z-50 flex min-h-screen flex-col items-center justify-start gap-5 py-4'>
      <div className='flex w-full items-center justify-between'>
        <Button className='group gap-1.5' variant='link' asChild>
          <Link href='/'>
            <ArrowLeft className='size-5 transition-transform group-hover:-translate-x-1' />
            Back to safety!
          </Link>
        </Button>
        <ShareLinkGame gameId={game.id} />
      </div>
      <div className='flex w-full grow flex-col items-center justify-center gap-5'>
        <h1 className='inline-block text-balance bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 bg-clip-text text-center font-creepster text-5xl font-bold uppercase text-transparent'>
          Wordle
        </h1>
        <ClientGamePage game={game} />
      </div>
    </section>
  )
}
