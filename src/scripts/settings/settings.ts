import type { Aircraft } from '../aircraft'
import { getSimpleDataByKey, setSimpleDataByKey } from '../database'
import { defaultTrackingInterval } from '../flight/tracking'
import type { ThemeType } from '../utils/themes'

export const getWeatherApiKey = async (): Promise<string | null> => {
  return await getSimpleDataByKey('settings_weather_api_key')
}

export const setWeatherApiKey = async (apiKey: string) => {
  await setSimpleDataByKey('settings_weather_api_key', apiKey)
}

export const getTheme = async (): Promise<ThemeType> => {
  const t = (await getSimpleDataByKey('settings_theme')) as ThemeType
  return t
}
export const setTheme = async (theme: string) => {
  await setSimpleDataByKey('settings_theme', theme)
}

export const getAircraft = async (): Promise<Aircraft | null> => {
  const aircraft = await getSimpleDataByKey('settings_current_aircraft')
  if (aircraft == null) {
    return null
  }
  return JSON.parse(aircraft)
}

export const setAircraft = async (aircraft: Aircraft) => {
  await setSimpleDataByKey(
    'settings_current_aircraft',
    JSON.stringify(aircraft)
  )
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

export const getTrackingInterval = async (): Promise<number> => {
  const trackingInterval = await getSimpleDataByKey(
    'settings_tracking_interval'
  )
  if (trackingInterval == null) {
    return defaultTrackingInterval
  }
  return parseInt(trackingInterval)
}

export const setTrackingInterval = async (trackingInterval: number) => {
  await setSimpleDataByKey('settings_tracking_interval', trackingInterval)
}
