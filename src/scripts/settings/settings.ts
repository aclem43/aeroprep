import type { Aircraft } from '../aircraft'
import { getSimpleDataByKey, setSimpleDataByKey } from '../database'
import type { ThemeType } from '../utils/themes'
import { defaultAircraft } from '../defaults'
import { logger } from '../utils/logger'

export const getWeatherApiKey = async (): Promise<string | null> => {
  return await getSimpleDataByKey('settings_weather_api_key')
}

export const setWeatherApiKey = async (apiKey: string) => {
  await setSimpleDataByKey('settings_weather_api_key', apiKey, true)
}

export const getTheme = async (): Promise<ThemeType> => {
  const t = (await getSimpleDataByKey('settings_theme')) as ThemeType
  return t
}
export const setTheme = async (theme: string) => {
  await setSimpleDataByKey('settings_theme', theme, true)
}

export const getAircraft = async (): Promise<Aircraft | null> => {
  const aircraft = await getSimpleDataByKey('settings_current_aircraft')
  if (aircraft == null) {
    return null
  }
  const returnData = defaultAircraft()
  Object.assign(returnData, JSON.parse(aircraft))

  return returnData
}

export const setAircraft = async (aircraft: Aircraft) => {
  await setSimpleDataByKey('settings_current_aircraft', aircraft)
  logger.log(`Current Aircraft Set (${aircraft.name})`)
}

export const getDefaultPilotWeight = async (): Promise<number> => {
  const weight = await getSimpleDataByKey('settings_default_weight')
  if (weight == null) {
    return 50
  }
  return parseInt(weight)
}
export const setDefaultPilotWeight = async (weight: number) => {
  await setSimpleDataByKey('settings_default_weight', weight)
}
