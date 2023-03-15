import { getSimpleDataByKey, setSimpleDataByKey } from '../database'
import {
  defaultMinimumDistance,
  defaultRateOfClimb,
  defaultTrackingDecimal,
  defaultTrackingInterval,
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
