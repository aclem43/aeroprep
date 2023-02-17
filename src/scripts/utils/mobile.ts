import { addInitializer } from '../initialize'
import { getPhyiscalScreenSize } from './phyiscalInfo'

export const isMobile = (): boolean => {
  if (getPhyiscalScreenSize().width < 768) {
    return true
  }
  return false
}

const initMobile = () => {
  if (isMobile()) {
    window.screen.orientation.lock('portrait')
  } else {
    window.screen.orientation.lock('landscape')
  }
}

addInitializer(initMobile)
