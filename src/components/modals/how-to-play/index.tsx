import { DialogDescription, DialogTitle } from '@/components/ui/dialog'
import Dynamic from '../dynamic'

const HowToPlayModal = () => {
  return (
    <Dynamic.Content className='flex !h-auto max-h-[98dvh] min-h-[50dvh] flex-col gap-2 border-primary bg-primary/5 backdrop-blur-md max-md:border-b-0 md:max-w-2xl md:py-10'>
      <DialogTitle className='hidden' hidden />
      <DialogDescription className='hidden' hidden />
      <div className='flex grow flex-col items-center justify-center gap-12 overflow-y-auto overflow-x-hidden p-6 scrollbar-thin md:p-0'>
        <div className='flex flex-col gap-2'>
          <div className='flex flex-col gap-2'>
            <h2 className='text-2xl font-semibold text-orange-400'>
              How to Play
            </h2>
            <ul className='list-inside list-disc text-lg *:mb-1 *:text-pretty *:text-muted-foreground'>
              <li>
                A mysterious Halloween-themed image will gradually reveal itself
                on the screen. Your goal is to guess the word it represents
                before the image is fully uncovered.
              </li>
              <li>
                Tap the ghostly letters below to form your guess. Each letter
                can only be used once, so choose wisely.
              </li>
              <li>
                Once you've formed your guess, summon your courage and click
                'Submit' to see if you're correct.
              </li>
              <li>
                If your guess is incorrect, you can try again by rearranging the
                letters or thinking of a different word.
              </li>
            </ul>
          </div>

          <div className='flex flex-col gap-2'>
            <h2 className='text-2xl font-semibold text-orange-400'>Beware!</h2>
            <ul className='list-inside list-disc text-lg *:mb-1 *:text-pretty *:text-muted-foreground'>
              <li>
                Each <span className='font-bold text-orange-500'>word</span> is
                conjured by the{' '}
                <span className='font-bold text-orange-500'>AI</span> from the
                depths of darkness.
              </li>
              <li>
                The <span className='font-bold text-orange-500'>images</span>{' '}
                are manifestations of the hidden word's essence.
              </li>
              <li>
                This realm is still in{' '}
                <span className='font-bold text-orange-500'>beta</span> -
                spectral repetitions may occur.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Dynamic.Content>
  )
}
export { HowToPlayModal }
