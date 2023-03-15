import { addInitializer } from '@/scripts/initialize'
import {
  getMinimumDistance,
  getTrackingDecimal,
  getTrackingInterval,
} from '@/scripts/settings/trackingsettings'
import { ref, type Ref } from 'vue'

export const defaultTrackingInterval = 1000
export const defaultTrackingDecimal = 4
export const defaultMinimumDistance = 0.5 // NM
export const defaultHeadingChange = 5
export const defaultRateOfClimb = 100 // Feet a minute
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
const lineMode: Ref<LineMode> = ref('altitude')
export const getLineModeRef = () => {
  return lineMode
}
export const getLineMode = () => {
  return lineMode.value
}
export const updateTrackingConstants = async () => {
  currentTrackingInterval.value = await getTrackingInterval()
  currentTrackingDecimal.value = await getTrackingDecimal()
  currentMinimumDistance.value = await getMinimumDistance()
}

addInitializer(updateTrackingConstants)
