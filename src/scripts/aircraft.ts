import { ref, type Ref } from 'vue'
import { getDataByKey, setDataByKey } from './database'

export interface Aircraft {
  name: string
  fuelBurn: number
}

const allAircraft: Ref<Aircraft[]> = ref([])
const currentAircraft = ref()

export const getAllAircraft = () => {
  return allAircraft
}

export const getCurrentAircraft = (): Ref<Aircraft | null> => {
  return currentAircraft
}

export const setCurrentAircarft = (aircraft: Aircraft) => {
  currentAircraft.value = aircraft
}

export const initAircraft = async (): Promise<Aircraft[]> => {
  const aircraft = await getDataByKey('aircraft_all')
  if (aircraft == null) {
    return []
  }
  return JSON.parse(aircraft)
}

export const addAircraft = async (aircraft: Aircraft) => {
  allAircraft.value.push(aircraft)
  await setDataByKey('aircraft_all', JSON.stringify(allAircraft.value))
}

export const deleteAircraft = async (aircraft: Aircraft) => {
  const index = allAircraft.value.indexOf(aircraft)
  if (index > -1) {
    allAircraft.value.splice(index)
  }
  await setDataByKey('aircraft_all', JSON.stringify(allAircraft.value))
}
