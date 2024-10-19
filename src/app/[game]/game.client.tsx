'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { format } from '@formkit/tempo'
import { Button } from '@/components/ui/button'
import { saveWinGame } from '@/server/actions/save-win-game'
import { GameWithWinner } from '@/types'
import { Alert, AlertTitle } from '@/components/ui/alert'
import { GRID_SIZE, TOTAL_ATTEMPTS } from '@/constants/game'
import { EarthIcon, SendHorizonal, TriangleAlert } from 'lucide-react'
import Image from 'next/image'

export default function ClientGamePage({
  game: initialGame
}: {
  game: GameWithWinner
}) {
  const [game, setGame] = useState(initialGame)
  const [guesses, setGuesses] = useState<string[]>(initialGame.guessedWords)
  const [currentGuess, setCurrentGuess] = useState('')
  const [revealedSquares, setRevealedSquares] = useState<number[]>([])
  const [gameOver, setGameOver] = useState(false)

  useEffect(() => {
    setGame(initialGame)
    setGuesses(initialGame.guessedWords)
    setGameOver(initialGame.isFinished)

    if (initialGame.isFinished) {
      setRevealedSquares([...Array(GRID_SIZE * GRID_SIZE)].map((_, i) => i))
    }
  }, [initialGame])

  useEffect(() => {
    revealNextSquare()
  }, [guesses])

  useEffect(() => {
    if (game.isFinished) {
      setGameOver(true)
      setRevealedSquares([...Array(GRID_SIZE * GRID_SIZE)].map((_, i) => i))
    } else if (guesses.length >= TOTAL_ATTEMPTS) {
      setGameOver(true)
    }
  }, [game.isFinished, guesses])

  const handleGuess = async () => {
    if (currentGuess.length !== game.wordLength) {
      toast.error('Oops!', {
        description: `The word must have ${game.wordLength} letters`
      })
      return
    }

    const newGuesses = [...guesses, currentGuess.toUpperCase()]
    setGuesses(newGuesses)
    setCurrentGuess('')

    if (currentGuess.toUpperCase() === game.word.toUpperCase()) {
      toast.promise(saveWinGame({ gameId: game.id, guesses }), {
        loading: 'Saving game...',
        success: (data) => data.message,
        error: (error) => error.message
      })
      return
    }
  }

  const revealNextSquare = () => {
    if (game.isFinished) {
      setRevealedSquares([...Array(GRID_SIZE * GRID_SIZE)].map((_, i) => i))
      return
    }

    if (revealedSquares.length < GRID_SIZE * GRID_SIZE && !gameOver) {
      let newSquare

      do {
        newSquare = Math.floor(Math.random() * (GRID_SIZE * GRID_SIZE))
      } while (revealedSquares.includes(newSquare))

      setRevealedSquares((prev) => [...prev, newSquare])
    }
  }

  const resetGame = () => {
    setGuesses([])
    setCurrentGuess('')
    setRevealedSquares([])
    setGameOver(false)
    revealNextSquare()
  }

  return (
    <>
      <div className='relative size-64 overflow-hidden rounded-sm'>
        <Image
          src={game.image}
          alt='Image to guess'
          className='no-drag size-full object-cover'
          width={256}
          height={256}
          priority
        />
        <div className='no-drag absolute inset-0 grid size-full grid-cols-5 grid-rows-5'>
          {[...Array(GRID_SIZE * GRID_SIZE)].map((_, index) => (
            <div
              key={index}
              className={cn(
                'transition-colors duration-300',
                !revealedSquares.includes(index) ? 'bg-muted' : 'bg-transparent'
              )}
            />
          ))}
        </div>
      </div>
      {gameOver && !game.isFinished && (
        <div className='w-full max-w-sm'>
          <Alert className='border-primary text-primary ring-1 ring-primary ring-offset-1 ring-offset-background transition-all duration-300 hover:ring-primary/50 hover:ring-offset-2'>
            <TriangleAlert className='size-4 !text-primary' />
            <AlertTitle>Game over!</AlertTitle>
            <div className='flex items-center justify-between'>
              <p className='text-sm leading-relaxed'>
                You have run out of attempts.
              </p>
              <Button
                variant='outline'
                className='h-auto rounded-lg border border-primary/50 p-1 text-xs hover:bg-primary/20 hover:backdrop-blur-md'
                onClick={resetGame}
              >
                Try again
              </Button>
            </div>
          </Alert>
        </div>
      )}
      <div className='mb-4 space-y-2'>
        {guesses.map((guess, index) => (
          <div key={index} className='flex space-x-2'>
            {guess.split('').map((letter, index) => {
              return (
                <div
                  key={index}
                  className={cn(
                    'flex size-12 items-center justify-center rounded bg-muted text-2xl font-bold dark:text-white',
                    game.word[index] === letter
                      ? 'bg-green-500 text-white'
                      : game.word.includes(letter) && 'bg-yellow-500 text-white'
                  )}
                >
                  {letter}
                </div>
              )
            })}
          </div>
        ))}
        {[...Array(TOTAL_ATTEMPTS - guesses.length)].map((_, index) => (
          <div key={index} className='flex space-x-2'>
            {[...Array(game.wordLength)].map((_, letterIndex) => (
              <div
                key={letterIndex}
                className='size-12 rounded bg-secondary-foreground'
              />
            ))}
          </div>
        ))}
      </div>
      {!gameOver && !game.isFinished && (
        <div className='relative mb-4 w-full max-w-sm'>
          <Input
            type='text'
            maxLength={game.wordLength}
            value={currentGuess}
            onChange={(e) => {
              const value = e.target.value?.trim()
              if (/[^a-zA-Z]/.test(value)) return

              setCurrentGuess(value.toUpperCase())
            }}
            className='w-full border-primary text-2xl uppercase placeholder:absolute placeholder:top-2 placeholder:text-sm placeholder:normal-case'
            disabled={gameOver}
            placeholder='Guess the word and press enter'
            onKeyDown={(e) => {
              if (
                e.key === 'Enter' &&
                currentGuess.length === game.wordLength
              ) {
                handleGuess()
              }
            }}
            autoFocus
          />
          <Button
            className='absolute inset-y-1 right-1 h-auto p-1'
            onClick={handleGuess}
            disabled={gameOver || currentGuess.length !== game.wordLength}
          >
            <SendHorizonal className='size-4 text-white' />
          </Button>
        </div>
      )}

      {game.isFinished && (
        <div className='flex flex-col items-center justify-center gap-0.5'>
          <p className='text-xs text-primary'>
            {game.isWinner ? 'You win!' : 'The winning player is from'}
          </p>
          {game.playerFlag === 'UKNW' ? (
            <div className='flex cursor-default items-center gap-2 rounded-md border border-primary/40 px-2 py-1 hover:bg-primary/5'>
              <EarthIcon className='size-4' />
              <p className='text-sm'>{game.playerCountry}</p>
            </div>
          ) : (
            <div className='flex items-center justify-center gap-2'>
              <img
                src={game.playerFlag!}
                alt='Player flag'
                className='size-4 rounded-full'
              />
              <p className='text-sm'>{game.playerCountry}</p>
            </div>
          )}
        </div>
      )}
      <p className='text-xs text-muted-foreground'>
        Game created on {format(game.createdAt, 'MMMM D, YYYY', 'en')}
      </p>
    </>
  )
}
