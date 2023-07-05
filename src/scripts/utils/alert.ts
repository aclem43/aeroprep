import { ref } from 'vue'

import { logger } from './logger'

export const openAlert = (message: string, timeout?: number) => {
  logger.log('Opening alert: ' + message)
  alert.value.message = message
  if (timeout == null) {
    alert.value.timeout = 2000
  } else {
    alert.value.timeout = timeout
  }
  alertRef.value = true
}

const alert = ref({
  message: '',
  timeout: 0,
})
export const getAlert = () => {
  return alert
}
const alertRef = ref()

export const getAlertRef = () => {
  return alertRef
}
