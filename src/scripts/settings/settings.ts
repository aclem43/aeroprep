import type { Aircraft } from '../aircraft'
import { getSimpleDataByKey, setSimpleDataByKey } from '../database'
import {
  defaultMinimumDistance,
  defaultTrackingDecimal,
  defaultTrackingInterval,
} from '@/scripts/flight/tracking/trackingConstants'
import type { ThemeType } from '../utils/themes'
import { defaultAircraft } from '../defaults'

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
  return parseFloat(trackingInterval)
}

export const setTrackingInterval = async (trackingInterval: number) => {
  await setSimpleDataByKey('settings_tracking_interval', trackingInterval)
}

export const getTrackingDecimal = async (): Promise<number> => {
  const trackingDecimal = await getSimpleDataByKey('settings_tracking_decimal')
  if (trackingDecimal == null) {
    return defaultTrackingDecimal
  }
  return parseInt(trackingDecimal)
}

export const setTrackingDecimal = async (trackingDecimal: number) => {
  await setSimpleDataByKey('settings_tracking_decimal', trackingDecimal)
}

export const getMinimumDistance = async (): Promise<number> => {
  const minimumDistance = await getSimpleDataByKey(
    'settings_tracking_min_distance'
  )
  if (minimumDistance == null) {
    return defaultMinimumDistance
  }
  return parseInt(minimumDistance)
}

export const setMinimumDistance = async (minimumDistance: number) => {
  await setSimpleDataByKey('settings_tracking_min_distance', minimumDistance)
}
