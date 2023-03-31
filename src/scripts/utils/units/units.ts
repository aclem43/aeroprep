import {
  getCurrentDistanceUnit,
  getCurrentHeightUnit,
  getCurrentLiquidUnit,
  getCurrentSpeedUnit,
  getCurrentWeightUnit,
} from '@/scripts/settings/unitsettings'
import type {
  DistanceUnit,
  SpeedUnit,
  WeightUnit,
  LiquidUnit,
} from './unitstypes'

export const convertDistanceUnit = (
  distance: number,
  from: DistanceUnit,
  to: DistanceUnit
): number => {
  if (from === to) return distance
  if (from === 'M' && to === 'NM') return distance / 1852
  if (from === 'NM' && to === 'M') return distance * 1852
  if (from === 'M' && to === 'KM') return distance / 1000
  if (from === 'KM' && to === 'M') return distance * 1000
  if (from === 'M' && to === 'FT') return distance * 3.28084
  if (from === 'FT' && to === 'M') return distance / 3.28084
  if (from === 'M' && to === 'MI') return distance / 1609.34
  if (from === 'MI' && to === 'M') return distance * 1609.34
  if (from === 'NM' && to === 'KM') return distance * 1.852
  if (from === 'KM' && to === 'NM') return distance / 1.852
  if (from === 'NM' && to === 'FT') return distance * 6076.12
  if (from === 'FT' && to === 'NM') return distance / 6076.12
  if (from === 'NM' && to === 'MI') return distance / 1.15078
  if (from === 'MI' && to === 'NM') return distance * 1.15078
  if (from === 'KM' && to === 'FT') return distance * 3280.84
  if (from === 'FT' && to === 'KM') return distance / 3280.84
  if (from === 'KM' && to === 'MI') return distance / 1.60934
  if (from === 'MI' && to === 'KM') return distance * 1.60934
  if (from === 'FT' && to === 'MI') return distance / 5280
  if (from === 'MI' && to === 'FT') return distance * 5280
  return distance
}

export const convertSpeedUnit = (
  speed: number,
  from: SpeedUnit,
  to: SpeedUnit
): number => {
  if (from === to) return speed
  if (from === 'KMH' && to === 'KTS') return speed / 1.852
  if (from === 'KTS' && to === 'KMH') return speed * 1.852
  if (from === 'KMH' && to === 'MPH') return speed / 1.60934
  if (from === 'MPH' && to === 'KMH') return speed * 1.60934
  if (from === 'KTS' && to === 'MPH') return speed * 1.15078
  if (from === 'MPH' && to === 'KTS') return speed / 1.15078
  return speed
}

export const convertWeightUnit = (
  weight: number,
  from: WeightUnit,
  to: WeightUnit
): number => {
  if (from === to) return weight
  if (from === 'kg' && to === 'lbs') return weight * 2.20462
  if (from === 'lbs' && to === 'kg') return weight / 2.20462
  return weight
}

export const convertLiquidUnit = (
  liquid: number,
  from: LiquidUnit,
  to: LiquidUnit
): number => {
  if (from === to) return liquid
  if (from === 'L' && to === 'gal(UK)') return liquid / 4.54609
  if (from === 'gal(UK)' && to === 'L') return liquid * 4.54609
  if (from === 'L' && to === 'gal(US)') return liquid / 3.785412
  if (from === 'gal(US)' && to === 'L') return liquid * 3.785412
  if (from === 'gal(UK)' && to === 'gal(US)') return liquid * 1.20095
  if (from === 'gal(US)' && to === 'gal(UK)') return liquid / 1.20095
  return liquid
}

export const convertToCurrentDistance = (
  distance: number,
  from: DistanceUnit
): number => {
  return convertDistanceUnit(distance, from, getCurrentDistanceUnit())
}

export const convertToCurrentSpeed = (
  speed: number,
  from: SpeedUnit
): number => {
  return convertSpeedUnit(speed, from, getCurrentSpeedUnit())
}
export const convertToCurrentHeight = (
  height: number,
  from: DistanceUnit
): number => {
  return convertDistanceUnit(height, from, getCurrentHeightUnit())
}

export const convertToCurrentWeight = (
  weight: number,
  from: WeightUnit
): number => {
  return convertWeightUnit(weight, from, getCurrentWeightUnit())
}

export const convertToCurrentLiquid = (
  liquid: number,
  from: LiquidUnit
): number => {
  return convertLiquidUnit(liquid, from, getCurrentLiquidUnit())
}
