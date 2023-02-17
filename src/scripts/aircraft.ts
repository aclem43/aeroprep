import { ref, type Ref } from 'vue'
import { getSimpleDataByKey, setSimpleDataByKey } from './database'
import { addInitializer } from './initialize'
import { openAlert } from './utils/alert'

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
  const aircraft = await getSimpleDataByKey('aircraft_all')
  if (aircraft == null) {
    return []
  }
  return JSON.parse(aircraft)
}

const initializeAircraft = async () => {
  const aircraft = getAllAircraft()
  aircraft.value = await initAircraft()

  if (aircraft.value == null || aircraft.value.length === 0) {
    openAlert('No aircraft found. Please add an aircraft to continue.')
  }
}
addInitializer(initializeAircraft)

export const addAircraft = async (aircraft: Aircraft) => {
  allAircraft.value.push(aircraft)
  await setSimpleDataByKey('aircraft_all', allAircraft.value)
}

export const deleteAircraft = async (aircraft: Aircraft) => {
  const index = allAircraft.value.indexOf(aircraft)
  if (index > -1) {
    allAircraft.value.splice(index)
  }
  await setSimpleDataByKey('aircraft_all', allAircraft.value)
}
