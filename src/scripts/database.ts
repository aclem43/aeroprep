import { Preferences } from '@capacitor/preferences'

export const setSimpleDataByKey = async (key: string, value: any) => {
  await Preferences.set({ key: key, value: value })
}

export const getSimpleDataByKey = async (
  key: string
): Promise<string | null> => {
  return (await Preferences.get({ key: key })).value
}

export const removeSimpleDataByKey = async (key: string) => {
  await Preferences.remove({ key: key })
}

export const getAllSimpleDataKeys = async (): Promise<string[]> => {
  return (await Preferences.keys()).keys
}

export const removeAllStorage = async () => {
  const keys = await getAllSimpleDataKeys()
  for (const key of keys) {
    await removeSimpleDataByKey(key)
  }
}

export const removeAllExceptSaves = async () => {
  const keys = await getAllSimpleDataKeys()
  for (const key of keys) {
    if (!key.startsWith('flight_save')) {
      await removeSimpleDataByKey(key)
    }
  }
}

export const removeAllSaves = async () => {
  const keys = await getAllSimpleDataKeys()
  for (const key of keys) {
    if (key.startsWith('flight_save')) {
      await removeSimpleDataByKey(key)
    }
  }
}
