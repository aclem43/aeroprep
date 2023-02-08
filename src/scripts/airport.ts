import { ref, type Ref } from 'vue'
import { getSimpleDataByKey, setSimpleDataByKey } from './database'
import { addInitializer } from './initialize'

export interface Airport {
  home: boolean
  code: string
}

const reactiveAirports: Ref<Airport[]> = ref([])

const initAirports = () => {
  getAirports()
}
addInitializer(initAirports)
export const getAirportsRef = () => {
  return reactiveAirports
}

export const getAirports = async (): Promise<Airport[]> => {
  const rawAirports = await getSimpleDataByKey('airports')
  if (rawAirports == null) {
    return []
  }
  reactiveAirports.value = JSON.parse(rawAirports)
  return reactiveAirports.value
}

export const addAirport = async (airport: Airport) => {
  const airports = await getAirports()
  if (airport.home) {
    airports.forEach((a, i) => {
      if (a.home) {
        airports[i].home = false
      }
    })
  }
  airports.push(airport)
  await setSimpleDataByKey('airports', JSON.stringify(airports))
  await getAirports()
}

export const deleteAirport = async (airport: Airport) => {
  const airports = await getAirports()
  let index = -1
  airports.forEach((a, i) => {
    if (a.code == airport.code) {
      index = i
    }
  })
  if (index > -1) {
    airports.splice(index)
  }
  await setSimpleDataByKey('airports', JSON.stringify(airports))
  await getAirports()
}
