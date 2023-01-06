import { ref, type Ref } from 'vue'

export interface Aircraft {
  name: string
  fuelBurn: number
}

const allAircraft: Ref<Aircraft[]> = ref([
  {
    name: 'Sling 2',
    fuelBurn: 18,
  },
  {
    name: 'Cessna 172',
    fuelBurn: 40,
  },
])
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
