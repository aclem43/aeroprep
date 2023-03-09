import { addInitializer } from '../initialize'
import { getPhyiscalScreenSize } from './phyiscalInfo'

export const isMobile = (): boolean => {
  if (getPhyiscalScreenSize().width < 768) {
    return true
  }
  return false
}

const initMobile = async () => {
  console.log(isMobile())
  if (isMobile()) {
    await window.screen.orientation.lock('portrait')
  } else {
    if (window.screen.orientation.type.includes('portrait')) {
      await window.screen.orientation.lock('landscape')
    }
  }
}

addInitializer(initMobile)
