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
