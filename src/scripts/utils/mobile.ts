import { addInitializer } from '../initialize'
import { getPhyiscalScreenSize } from './phyiscalInfo'
import { useScreenOrientation } from '@vueuse/core'
import { logger } from './logger'

const { isSupported, lockOrientation, unlockOrientation } =
  useScreenOrientation()

export const isMobile = (): boolean => {
  if (getPhyiscalScreenSize().width < 768) {
    return true
  }
  return false
}

const initMobile = async () => {
  if (isMobile()) {
    if (isSupported.value) {
      await lockOrientation('portrait')
      logger.log('Mobile orientation locked to portrait')
    }
  } else {
    if (isSupported.value) {
      await lockOrientation('landscape')
      logger.log('Orientation locked to landscape')
    } else {
      unlockOrientation()
    }
  }
}

addInitializer(initMobile, 'Mobile/Screen Orientation')
