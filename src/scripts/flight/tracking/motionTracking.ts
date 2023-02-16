import { Motion } from '@capacitor/motion'

export const startMotionTracking = async () => {
  await Motion.addListener('orientation', (event) => {
    console.log('Orientation: ', event)
  })
}

export const stopMotionTracking = async () => {
  await Motion.removeAllListeners()
}
