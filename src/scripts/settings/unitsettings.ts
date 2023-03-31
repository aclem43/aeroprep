import { type Ref, ref } from 'vue'
import { getSimpleDataByKey, setSimpleDataByKey } from '../database'
import { addInitializer } from '../initialize'
import { openAlert } from '../utils/alert'
import type {
  SpeedUnit,
  DistanceUnit,
  LiquidUnit,
  WeightUnit,
} from '@/scripts/utils/units/unitstypes'

const currentSpeedUnit: Ref<SpeedUnit> = ref('KTS')
const currentDistanceUnit: Ref<DistanceUnit> = ref('NM')
const currentHeightUnit: Ref<DistanceUnit> = ref('FT')
const currentWeightUnit: Ref<WeightUnit> = ref('kg')
const currentLiquidUnit: Ref<LiquidUnit> = ref('L')
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
// Weight
export const getCurrentWeightUnit = () => {
  return currentWeightUnit.value
}
export const getCurrentWeightUnitRef = () => {
  return currentWeightUnit
}
// Liquid
export const getCurrentLiquidUnit = () => {
  return currentLiquidUnit.value
}
export const getCurrentLiquidUnitRef = () => {
  return currentLiquidUnit
}
// ALL

const initUnits = async () => {
  const speedUnit = await getSimpleDataByKey('settings_units_speed')
  if (speedUnit != null) {
    currentSpeedUnit.value = speedUnit as SpeedUnit
  }

  const heightUnit = await getSimpleDataByKey('settings_units_height')
  if (heightUnit != null) {
    currentHeightUnit.value = heightUnit as DistanceUnit
  }

  const distanceUnit = await getSimpleDataByKey('settings_units_distance')
  if (distanceUnit != null) {
    currentDistanceUnit.value = distanceUnit as DistanceUnit
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
  await setSimpleDataByKey(
    'settings_units_weight',
    currentWeightUnit.value,
    true
  )
  await setSimpleDataByKey(
    'settings_units_liquid',
    currentLiquidUnit.value,
    true
  )
  openAlert('Units Saved')
}

addInitializer(initUnits)
