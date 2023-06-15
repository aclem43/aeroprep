import { removeSimpleDataByKey } from '../database'
import { getAllSimpleDataKeys, setSimpleDataByKey } from '../database'
import { getSimpleDataByKey } from '../database'

export const getCachedData = async (
  url: string,
  opts?: RequestInfo
): Promise<string> => {
  const cached = await isCached(url)
  if (cached) {
    return (await getSimpleDataByKey(`cache-${hash(url)}`)) ?? ''
  }
  if (opts) {
    const data = await fetch(opts)
    const text = await data.json()
    await cacheData(url, text)
    return text
  } else {
    const data = await fetch(url)
    const text = await data.json()
    await cacheData(url, text)
    return text
  }
}
const isCached = async (url: string) => {
  const data = await getSimpleDataByKey(`cache-${hash(url)}`)
  return data ? true : false
}

const hash = (url: string) => {
  let hash = 0
  for (let i = 0, len = url.length; i < len; i++) {
    const chr = url.charCodeAt(i)
    hash = (hash << 5) - hash + chr
    hash |= 0 // Convert to 32bit integer
  }
  return hash
}

const cacheData = async (url: string, data: string) => {
  await setSimpleDataByKey(`cache-${hash(url)}`, JSON.stringify(data), true)
}

export const clearCache = async () => {
  const keys = await getAllSimpleDataKeys()
  keys.forEach(async (key) => {
    if (key.startsWith('cache-')) {
      await removeSimpleDataByKey(key)
    }
  })
}
