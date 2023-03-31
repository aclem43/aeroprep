import { SplashScreen } from '@capacitor/splash-screen'
import { logger } from './utils/logger'

export const initializeEvents: { func: () => void; name?: string }[] = []

export const initialize = async () => {
  logger.log('Starting initialization')
  for (const init of initializeEvents) {
    try {
      await init.func()
    } catch (e) {
      logger.error(`Error ${e} In Init Function` + init.name)
    }
  }
  SplashScreen.hide()
  logger.log('Initialization complete')
}

export const addInitializer = (initFunc: () => void, name?: string) => {
  initializeEvents.push({ func: initFunc, name: name })
}
