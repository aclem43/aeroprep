import { ref, type Ref } from 'vue'
import { getAllSimpleDataKeys, getSimpleDataByKey } from '../database'

const checkIfDevMOde = () => {
  return process.env.NODE_ENV === 'development'
}
export const devMode = checkIfDevMOde()

const enabled = ref(devMode)

export const getDevToolEnabled = (): Ref<boolean> => {
  return enabled
}

const storageInfo = ref('')
export const loadStorageInfo = async () => {
  const keys = await getAllSimpleDataKeys()
  const data = []
  for (const key of keys) {
    const dat = await getSimpleDataByKey(key)
    data.push({ key: key, data: dat })
  }
  storageInfo.value = JSON.stringify(data)
}

export const getStorageInfo = () => {
  return storageInfo
}
declare const process: {
  env: {
    NODE_ENV: string
  }
}
