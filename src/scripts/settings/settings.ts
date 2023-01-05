import { getDataByKey, setDataByKey } from '../database'
import type { ThemeType } from '../utils/themes'

export const getWeatherApiKey = async (): Promise<string | null> => {
  return await getDataByKey('settings_weather_api_key')
}

export const setWeatherApiKey = async (apiKey: string) => {
  await setDataByKey('settings_weather_api_key', apiKey)
}

export const getTheme = async (): Promise<ThemeType> => {
  const t = (await getDataByKey('settings_theme')) as ThemeType
  return t
}
export const setTheme = async (theme: string) => {
  await setDataByKey('settings_theme', theme)
}
