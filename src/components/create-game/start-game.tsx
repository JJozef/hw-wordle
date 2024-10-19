'use client'

import { useState, useId } from 'react'
import { z } from 'zod'
import { Skull } from 'lucide-react'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { InfoApiKey } from './info-api-key'
import { zodResolver } from '@hookform/resolvers/zod'
import { BeforeGameStart } from './before-game-start'
import { createGameSchema } from '@/server/schema/create-game'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form'

const StartGame = () => {
  const [createMode, setCreateMode] = useState(false)
  const [isCreatingGame, setCreatingGame] = useState(false)
  const formId = useId()
  const router = useRouter()

  const form = useForm<z.infer<typeof createGameSchema>>({
    resolver: zodResolver(createGameSchema),
    defaultValues: {
      apiKey: ''
    }
  })

  async function onSubmit(values: z.infer<typeof createGameSchema>) {
    setCreatingGame(true)

    await fetch('/api/create-game', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        apiKey: values.apiKey
      })
    })
      .then(async (res) => {
        if (res.status === 200) {
          const data = await res.json()

          toast.success('Nice!', {
            description: data.message,
            duration: 3500,
            closeButton: true
          })

          form.reset()
          setCreateMode(false)

          router.push(`/${data.gameId}`)
        } else {
          const { error } = await res.json()

          toast.error('¡Error!', {
            description: error.message,
            duration: 3500,
            closeButton: true
          })
        }
      })
      .finally(() => setCreatingGame(false))
  }

  if (!createMode) {
    return <BeforeGameStart setCreateMode={setCreateMode} />
  }

  if (isCreatingGame) {
    return (
      <div className='flex w-full items-center justify-center text-primary'>
        <div className='flex flex-col items-center justify-center gap-2'>
          <Skull className='size-5 animate-spin' />
          <p className='font-creepster text-xl'>creating game...</p>
        </div>
      </div>
    )
  }

  return (
    <div className='flex w-full flex-col items-center gap-3'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full'
          id={`form-create-game${formId}`}
        >
          <div>
            <FormField
              control={form.control}
              name='apiKey'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className='relative'>
                      <Input
                        className='rounded-lg border-primary pr-9'
                        placeholder='sk-...0-YA'
                        autoComplete='off'
                        autoCorrect='off'
                        autoCapitalize='off'
                        autoFocus
                        {...field}
                      />
                      <InfoApiKey />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
      <div className='flex items-center gap-2'>
        <Button
          variant='secondary'
          className='rounded-full transition-all duration-200 hover:-rotate-3 hover:scale-105 active:scale-95'
          onClick={() => setCreateMode(false)}
          type='button'
        >
          Cancel
        </Button>
        <Button
          className='rounded-full transition-all duration-200 hover:rotate-3 hover:scale-105 active:scale-95'
          type='submit'
          form={`form-create-game${formId}`}
        >
          Create Game
        </Button>
      </div>
    </div>
  )
}

export { StartGame }
