import { SplashScreen } from '@capacitor/splash-screen'

export const initializeEvents: (() => void)[] = []

export const initialize = async () => {
  for (const initFunc of initializeEvents) {
    await initFunc()
  }
  SplashScreen.hide()
}

export const addInitializer = (initFunc: () => void) => {
  initializeEvents.push(initFunc)
}
