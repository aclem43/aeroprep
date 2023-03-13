import { addInitializer } from '@/scripts/initialize'
import {
  getMinimumDistance,
  getTrackingDecimal,
  getTrackingInterval,
} from '@/scripts/settings/trackingsettings'
import { ref } from 'vue'

export const defaultTrackingInterval = 1000
export const defaultTrackingDecimal = 4
export const defaultMinimumDistance = 0.5 // NM
export const defaultHeadingChange = 5

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
export const updateTrackingConstants = async () => {
  currentTrackingInterval.value = await getTrackingInterval()
  currentTrackingDecimal.value = await getTrackingDecimal()
  currentMinimumDistance.value = await getMinimumDistance()
}

addInitializer(updateTrackingConstants)
