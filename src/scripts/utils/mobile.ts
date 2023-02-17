import { getPhyiscalScreenSize } from './phyiscalInfo'

export const isMobile = (): boolean => {
  if (getPhyiscalScreenSize().width < 768) {
    return true
  }
  return false
}
