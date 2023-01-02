import { ref } from 'vue'

const allAircraft = ref([
  {
    name: 'Sling 2',
    fuelburn: 18,
  },
  {
    name: 'Cessna 172',
    fuelburn: 40,
  },
])
const currentAircraft = ref()

export const getAllAircraft = () => {
  return allAircraft
}

export const getCurrentAircraft = () => {
  return currentAircraft
}
