import { Preferences } from '@capacitor/preferences'

export const setDataByKey = async (key: string, value: any) => {
  await Preferences.set({ key: key, value: value })
}

export const getDataByKey = async (key: string): Promise<string | null> => {
  return await (
    await Preferences.get({ key: key })
  ).value
}

export const removeDataByKey = async (key: string) => {
  await Preferences.remove({ key: key })
}
