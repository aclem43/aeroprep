import { ref } from 'vue'

export const openAlert = (message: string, timeout: number) => {
  alert.value.message = message
  alert.value.timeout = timeout
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
