import { addInitializer } from '@/scripts/initialize'
import {
  getMinimumDistance,
  getTrackingDecimal,
  getTrackingInterval,
} from '@/scripts/settings/settings'
import { ref } from 'vue'

export const defaultTrackingInterval = 5000
export const defaultTrackingDecimal = 4
export const defaultMinimumDistance = 0.5 // NM

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

export const updateTrackingConstants = async () => {
  currentTrackingInterval.value = await getTrackingInterval()
  currentTrackingDecimal.value = await getTrackingDecimal()
  currentMinimumDistance.value = await getMinimumDistance()
}

addInitializer(updateTrackingConstants)
