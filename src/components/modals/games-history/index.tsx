import { useEffect, useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { History, Skull } from 'lucide-react'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { getHistotyGames } from '@/server/actions/get-history-game'
import { Game } from '@prisma/client'
import Link from 'next/link'
import { format } from '@formkit/tempo'

const GamesHistory = () => {
  const [open, setOpen] = useState(false)
  const [games, setGames] = useState<Game[]>([])
  const [loading, startTransition] = useTransition()

  useEffect(() => {
    if (open) {
      startTransition(async () => {
        const historyGames = await getHistotyGames()
        if (historyGames) return setGames(historyGames)
      })
    }
  }, [open])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant='link'
          className='flex h-auto items-center gap-1 rounded-full py-1 text-xs tracking-widest text-muted-foreground transition-all duration-200 hover:scale-105 hover:no-underline active:scale-95'
        >
          <History className='size-3' />
          History
        </Button>
      </SheetTrigger>
      <SheetContent className='border-primary/50 bg-primary/10 backdrop-blur-md'>
        <SheetHeader>
          <SheetTitle>Games History</SheetTitle>
          <SheetDescription>Last 10 games won</SheetDescription>
        </SheetHeader>
        <div className='flex h-full max-h-[91.3dvh] flex-col gap-3 py-4 scrollbar-thin'>
          {loading ? (
            <div className='flex h-full flex-col items-center justify-center gap-3 text-center'>
              <Skull className='size-10 animate-spin text-primary' />
              <p className='font-creepster text-lg text-primary'>Loading...</p>
            </div>
          ) : games.length ? (
            games.map((game) => (
              <Link
                className='flex h-fit items-start gap-2 rounded-xl border border-primary p-2 ring-1 ring-primary ring-offset-1 ring-offset-background transition-all duration-300 hover:ring-primary/50 hover:ring-offset-2'
                href={`/${game.id}`}
                key={game.id}
              >
                <img
                  src={game.image}
                  alt={game.word}
                  className='size-16 rounded-lg object-cover'
                  loading='lazy'
                  decoding='async'
                  fetchPriority='high'
                />
                <div className='flex h-full flex-col'>
                  <h4 className='font-creepster'>{game.word}</h4>
                  <p className='text-sm'>
                    {format(game.createdAt, 'MMMM D, YYYY', 'en')}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <div className='flex h-full flex-col items-center justify-center gap-3 text-center'>
              <Skull className='size-10 animate-wiggle text-primary duration-1000' />
              <p className='font-creepster text-lg text-primary'>
                No games found
              </p>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

export { GamesHistory }
