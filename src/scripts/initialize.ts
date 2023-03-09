import { SplashScreen } from '@capacitor/splash-screen'
import { logger } from './utils/logger'

export const initializeEvents: (() => void)[] = []

export const initialize = async () => {
  logger.log('Starting initialization')
  for (const initFunc of initializeEvents) {
    await initFunc()
  }
  SplashScreen.hide()
  logger.log('Initialization complete')
}

export const addInitializer = (initFunc: () => void) => {
  initializeEvents.push(initFunc)
}
