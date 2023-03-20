import { type Ref, ref } from 'vue'
import { getSimpleDataByKey, setSimpleDataByKey } from '../database'
import { addInitializer } from '../initialize'
import { openAlert } from '../utils/alert'

export type DistanceUnits = 'NM' | 'KM' | 'M' | 'Mi' | 'FT'
export type SpeedUnits = 'KTS' | 'KMPH' | 'MPH' | 'M/S'

export const distanceUnits: DistanceUnits[] = ['NM', 'KM', 'M', 'Mi', 'FT']
export const speedUnits: SpeedUnits[] = ['KTS', 'KMPH', 'MPH', 'M/S']

export const convertDistanceFromM = (
  value: number,
  unit: DistanceUnits
): number => {
  if (unit == 'NM') {
    return value * 0.00054
  }
  if (unit == 'KM') {
    return value * 0.001
  }
  if (unit == 'FT') {
    return value * 3.28084
  }
  if (unit == 'Mi') {
    return value * 0.000621
  }
  return value
}

export const convertSpeedFromMS = (value: number, unit: SpeedUnits) => {
  if (unit == 'KMPH') {
    return value * 3.6
  }
  if (unit == 'KTS') {
    return value * 1.944012
  }
  if (unit == 'MPH') {
    return value * 2.237136
  }
  return value
}

const currentSpeedUnit: Ref<SpeedUnits> = ref('KTS')
const currentDistanceUnit: Ref<DistanceUnits> = ref('NM')
const currentHeightUnit: Ref<DistanceUnits> = ref('FT')
// Speed
export const getCurrentSpeedUnit = () => {
  return currentSpeedUnit.value
}
export const getCurrentSpeedUnitRef = () => {
  return currentSpeedUnit
}

// Height
export const getCurrentHeightUnit = () => {
  return currentHeightUnit.value
}
export const getCurrentHeightUnitRef = () => {
  return currentHeightUnit
}
// Distance
export const getCurrentDistanceUnit = () => {
  return currentDistanceUnit.value
}
export const getCurrentDistanceUnitRef = () => {
  return currentDistanceUnit
}
// ALL

const initUnits = async () => {
  const speedUnit = await getSimpleDataByKey('settings_units_speed')
  if (speedUnit != null) {
    currentSpeedUnit.value = speedUnit as SpeedUnits
  }

  const heightUnit = await getSimpleDataByKey('settings_units_height')
  if (heightUnit != null) {
    currentHeightUnit.value = heightUnit as DistanceUnits
  }

  const distanceUnit = await getSimpleDataByKey('settings_units_distance')
  if (distanceUnit != null) {
    currentDistanceUnit.value = distanceUnit as DistanceUnits
  }
}

export const saveUnits = async () => {
  await setSimpleDataByKey('settings_units_speed', currentSpeedUnit.value, true)
  await setSimpleDataByKey(
    'settings_units_height',
    currentHeightUnit.value,
    true
  )
  await setSimpleDataByKey(
    'settings_units_distance',
    currentDistanceUnit.value,
    true
  )
  openAlert('Units Saved')
}

addInitializer(initUnits)
