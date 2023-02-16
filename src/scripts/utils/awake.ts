import { KeepAwake } from '@capacitor-community/keep-awake'
import { ref } from 'vue'

const keepAwake = ref(false)

export const turnOnKeepAwake = async () => {
  if (keepAwake.value) {
    return
  }
  if (await KeepAwake.isSupported()) {
    await KeepAwake.keepAwake()
    keepAwake.value = true
  }
}
export const turnOffKeepAwake = async () => {
  if (!keepAwake.value) {
    return
  }
  if (await KeepAwake.isSupported()) {
    await KeepAwake.allowSleep()
    keepAwake.value = false
  }
}

export const getKeepAwakeIcon = () => {
  if (keepAwake.value) {
    return 'mdi-sleep-off'
  } else {
    return 'mdi-sleep'
  }
}

export const toggleKeepAwake = async () => {
  if (keepAwake.value) {
    await turnOffKeepAwake()
  } else {
    await turnOnKeepAwake()
  }
}
