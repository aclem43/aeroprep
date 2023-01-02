import router from '@/router'
import { App } from '@capacitor/app'

export const setupListeners = () => {
  App.addListener('backButton', () => {
    router.go(-1)
  })
}
