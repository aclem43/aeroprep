import { type Ref, ref } from 'vue'
import { getSimpleDataByKey, setSimpleDataByKey } from '../database'
import { addInitializer } from '../initialize'
import { openAlert } from '../utils/alert'

export type DistanceUnits = 'NM' | 'KM' | 'M' | 'Mi' | 'FT'
export type SpeedUnits = 'KTS' | 'KMPH' | 'MPH' | 'M/S'
export type WeightUnits = 'kg' | 'Pounds'
export type LiquidUnits = 'L' | 'mL' | 'Gallon'

export const distanceUnits: DistanceUnits[] = ['NM', 'KM', 'M', 'Mi', 'FT']
export const speedUnits: SpeedUnits[] = ['KTS', 'KMPH', 'MPH', 'M/S']
export const weightUnits: WeightUnits[] = ['Pounds', 'kg']
export const liquidUnits: LiquidUnits[] = ['Gallon', 'L', 'mL']

export const convertToCurrentHeight = (value: number) => {
  return convertDistanceFromM(value, currentHeightUnit.value)
}
export const convertToCurrentDistance = (value: number) => {
  return convertDistanceFromM(value, currentDistanceUnit.value)
}
export const convertToCurrentSpeed = (value: number) => {
  return convertSpeedFromMS(value, currentSpeedUnit.value)
}

export const convertToCurrentWeight = (value: number) => {
  return convertWeightFromKG(value, currentWeightUnit.value)
}

export const convertToCurrentLiquid = (value: number) => {
  return convertLiquidFromL(value, currentLiquidUnit.value)
}

export const convertWeightFromKG = (value: number, unit: WeightUnits) => {
  if (unit == 'Pounds') {
    return value * 2.20462
  }
  return value
}

export const convertLiquidFromL = (value: number, unit: LiquidUnits) => {
  if (unit == 'Gallon') {
    return value * 0.2641722
  }
  if (unit == 'mL') {
    return value * 1000
  }
  return value
}

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

// Export a function that converts from any distance unit to any other distance unit
export const convertDistance = (
  value: number,
  fromUnit: DistanceUnits,
  toUnit: DistanceUnits
) => {
  if (fromUnit == 'NM') {
    if (toUnit == 'KM') {
      return value * 1.852
    }
    if (toUnit == 'M') {
      return value * 1852
    }
    if (toUnit == 'Mi') {
      return value * 1.15078
    }
    if (toUnit == 'FT') {
      return value * 6076.12
    }
  }
  if (fromUnit == 'KM') {
    if (toUnit == 'NM') {
      return value * 0.539957
    }
    if (toUnit == 'M') {
      return value * 1000
    }
    if (toUnit == 'Mi') {
      return value * 0.621371
    }
    if (toUnit == 'FT') {
      return value * 3280.84
    }
  }
  if (fromUnit == 'M') {
    if (toUnit == 'NM') {
      return value * 0.00054
    }
    if (toUnit == 'KM') {
      return value * 0.001
    }
    if (toUnit == 'Mi') {
      return value * 0.000621
    }
    if (toUnit == 'FT') {
      return value * 3.28084
    }
  }
  if (fromUnit == 'Mi') {
    if (toUnit == 'NM') {
      return value * 0.868976
    }

    if (toUnit == 'KM') {
      return value * 1.60934
    }
    if (toUnit == 'M') {
      return value * 1609.34
    }
    if (toUnit == 'FT') {
      return value * 5280
    }
  }
  if (fromUnit == 'FT') {
    if (toUnit == 'NM') {
      return value * 0.000164579
    }
    if (toUnit == 'KM') {
      return value * 0.0003048
    }

    if (toUnit == 'M') {
      return value * 0.3048
    }
    if (toUnit == 'Mi') {
      return value * 0.000189394
    }
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
const currentWeightUnit: Ref<WeightUnits> = ref('kg')
const currentLiquidUnit: Ref<LiquidUnits> = ref('L')
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
