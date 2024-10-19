'use client'

import { createPushModal } from 'pushmodal'

// dynamic
import Dynamic from './dynamic'

// Modals
import { HowToPlayModal } from './how-to-play'

export const {
  pushModal,
  popModal,
  popAllModals,
  replaceWithModal,
  useOnPushModal,
  onPushModal,
  ModalProvider
} = createPushModal({
  modals: {
    HowToPlayModal: {
      Component: HowToPlayModal,
      Wrapper: Dynamic.Wrapper
    }
  }
})
