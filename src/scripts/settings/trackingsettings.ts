import { getSimpleDataByKey, setSimpleDataByKey } from '../database'
import {
  defaultLineColors,
  defaultMinimumDistance,
  defaultRateOfClimb,
  defaultTrackingDecimal,
  defaultTrackingInterval,
  type LineMode,
} from '../flight/tracking/trackingConstants'

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

export const getRateOfClimb = async (): Promise<number> => {
  const rateOfClimb = await getSimpleDataByKey(
    'settings_tracking_rate_of_climb'
  )
  if (rateOfClimb == null) {
    return defaultRateOfClimb
  }
  return parseInt(rateOfClimb)
}

export const setRateOfClimb = async (rateOfClimb: number) => {
  await setSimpleDataByKey('settings_tracking_rate_of_climb', rateOfClimb)
}

export interface LineColors {
  ascending: string
  descending: string
  cruise: string
}

export const getLineColors = async (): Promise<LineColors> => {
  const lineColors = await getSimpleDataByKey('settings_tracking_line_colors')
  if (lineColors == null) {
    return defaultLineColors
  }
  return JSON.parse(lineColors)
}
export const setLineColors = async (lineColors: LineColors) => {
  await setSimpleDataByKey('settings_tracking_line_colors', lineColors)
}

export const getLineMode = async (): Promise<LineMode> => {
  const lineMode = await getSimpleDataByKey('settings_tracking_line_mode')
  if (lineMode == null) {
    return 'altitude'
  }
  return lineMode as LineMode
}

export const setLineMode = async (lineMode: LineMode) => {
  await setSimpleDataByKey('settings_tracking_line_mode', lineMode, true)
}
