import { ref } from 'vue'
import { getAllSimpleDataKeys, getSimpleDataByKey } from '../database'

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
