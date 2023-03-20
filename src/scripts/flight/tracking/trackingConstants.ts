import { addInitializer } from '@/scripts/initialize'
import {
  getLineColors,
  getLineMode,
  getMinimumDistance,
  getTrackingDecimal,
  getTrackingInterval,
  type LineColors,
} from '@/scripts/settings/trackingsettings'
import { ref, type Ref } from 'vue'

// Defaults
export const defaultTrackingInterval = 1000
export const defaultTrackingDecimal = 4
export const defaultMinimumDistance = 0.5 // NM
export const defaultHeadingChange = 5
export const defaultRateOfClimb = 100 // Feet a minute
export const defaultLineColors: LineColors = {
  ascending: '#0062ff',
  cruise: '#48ff00',
  descending: '#ff0800',
}

const currentTrackingInterval = ref(defaultMinimumDistance)
export const getCurrentTrackingInterval = () => {
  return currentTrackingInterval.value
}

const currentTrackingDecimal = ref(defaultTrackingDecimal)
export const getCurrentTrackingDecimal = () => {
  return currentTrackingDecimal.value
}

const currentMinimumDistance = ref(defaultMinimumDistance)
export const getCurrentMinimumDistance = () => {
  return currentMinimumDistance.value
}

const currentHeadingChange = ref(defaultHeadingChange)
export const getCurrentHeadingChange = () => {
  return currentHeadingChange.value
}

const currentRateOfClimb = ref(defaultRateOfClimb)
export const getCurrentRateOfClimb = () => {
  return currentRateOfClimb.value
}
export type LineMode = 'basic' | 'altitude'
const currentLineMode: Ref<LineMode> = ref('altitude')
export const getCurrentLineModeRef = () => {
  return currentLineMode
}
export const getCurrentLineMode = () => {
  return currentLineMode.value
}
const currentLineColor = ref(defaultLineColors)
export const getCurrentLineColor = () => {
  return currentLineColor.value
}

export const updateTrackingConstants = async () => {
  currentTrackingInterval.value = await getTrackingInterval()
  currentTrackingDecimal.value = await getTrackingDecimal()
  currentMinimumDistance.value = await getMinimumDistance()
  currentLineMode.value = await getLineMode()
  currentLineColor.value = await getLineColors()
}

addInitializer(updateTrackingConstants)
