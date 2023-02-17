import { ref, type Ref } from 'vue'
import { getSimpleDataByKey, setSimpleDataByKey } from '../database'
import { addInitializer } from '../initialize'
import type { FuelRow } from './fuelaction'

export interface PrepFlight {
  dual: boolean
  passengers: { pax: boolean; cfi: boolean; weight: number }
  currentFuel: number
  fuelRows: FuelRow[]
}

const currentFlight: Ref<PrepFlight> = ref({
  dual: true,
  passengers: { pax: false, cfi: false, weight: 0 },
  currentFuel: 0,
  fuelRows: [],
})

export const getCurrentFlight = (): Ref<PrepFlight> => {
  return currentFlight
}

export const saveFlight = async (flight: PrepFlight) => {
  await setSimpleDataByKey('action_flight_data', flight)
}

export const resetCurrentFlight = () => {
  currentFlight.value = {
    dual: true,
    passengers: { pax: false, cfi: false, weight: 0 },
    currentFuel: 0,
    fuelRows: [],
  }
}

export const initFlight = async () => {
  const data = await getSimpleDataByKey('action_flight_data')
  if (!data) {
    resetCurrentFlight()
    return
  }
  currentFlight.value = JSON.parse(data)
}

addInitializer(initFlight)
