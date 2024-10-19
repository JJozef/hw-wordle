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
            <h2 className='font-creepster text-2xl text-orange-400'>
              How to Play
            </h2>
            <ul className='list-inside list-disc text-lg *:text-pretty *:text-muted-foreground [&>*:not(:last-child)]:mb-2'>
              <li>
                A mysterious Halloween-themed image will gradually reveal itself
                on the screen. Your goal is to guess the word it represents
                before the image is fully uncovered.
              </li>
              <li>
                Write your guess in the text box at the bottom of the screen.
              </li>
              <li>
                Once you've formed your guess, summon your courage and click
                'Enter' or 'Submit button' to see if you're correct.
              </li>
              <li>
                If your guess is incorrect, you can try again by rearranging the
                letters or thinking of a different word.
              </li>
              <li>
                If you guess the word, you will be registered as the winner of
                this game.
              </li>
            </ul>
          </div>

          <div className='flex flex-col gap-2'>
            <h2 className='font-creepster text-2xl text-orange-400'>Beware!</h2>
            <ul className='list-inside list-disc text-lg *:text-pretty *:text-muted-foreground [&>*:not(:last-child)]:mb-2'>
              <li>
                Each <b>word</b> is conjured by the <b>AI</b> from the depths of
                darkness.
              </li>
              <li>
                The <b>images</b> are manifestations of the hidden word's
                essence.
              </li>
              <li>
                This realm is still in <b>beta</b> - spectral repetitions may
                occur.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Dynamic.Content>
  )
}
export { HowToPlayModal }
