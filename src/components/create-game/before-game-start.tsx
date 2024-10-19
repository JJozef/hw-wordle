import { Button } from '@/components/ui/button'
import { pushModal } from '@/components/modals'
import { GamesHistory } from '../modals/games-history'

interface BeforeGameStartProps {
  setCreateMode: (value: boolean) => void
}

const BeforeGameStart = ({ setCreateMode }: BeforeGameStartProps) => {
  return (
    <div className='flex flex-col items-center justify-center gap-4'>
      <div className='flex items-center gap-3'>
        <Button
          variant='secondary'
          className='rounded-full transition-all duration-200 hover:-rotate-3 hover:scale-105 active:scale-95'
          onClick={() => pushModal('HowToPlayModal')}
        >
          How to Play
        </Button>
        <Button
          className='rounded-full transition-all duration-200 hover:rotate-3 hover:scale-105 active:scale-95'
          onClick={() => setCreateMode(true)}
        >
          Start Game
        </Button>
      </div>
      <GamesHistory />
    </div>
  )
}

export { BeforeGameStart }
