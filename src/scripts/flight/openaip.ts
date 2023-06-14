import { ref } from 'vue'

import { addInitializer } from '../initialize'
import { getOpenAipApiKey } from '../settings/mapsettings'

const airspaces = ref<Airspace[]>([])
const icaoClassIncluded = ref([0, 1, 2, 3, 4, 5, 6])

export const loadAirspaces = async () => {
  const apiKey = await getOpenAipApiKey()
  let icaoClassQueryString = ''
  icaoClassIncluded.value.forEach((icaoClass) => {
    icaoClassQueryString = icaoClassQueryString + `&icaoClass=${icaoClass}`
  })
  const json = await fetch(
    `https://api.core.openaip.net/api/airspaces?apiKey=${apiKey}&country=AU&limit=200${icaoClassQueryString}`
  )
  const data = await json.json()
  airspaces.value = data.items
  console.log(airspaces.value)
}

export const flipCoordinates = (coordinates: number[][][]): number[][][] => {
  const flippedCoordinates: number[][][] = []
  coordinates.forEach((c) => {
    const flipped: number[][] = []
    c.forEach((c2) => {
      flipped.push([c2[1], c2[0]])
    })
    flippedCoordinates.push(flipped)
  })

  return flippedCoordinates
}

export const getAirspaces = () => {
  return airspaces
}
export const getIcaoClassIncluded = () => {
  return icaoClassIncluded
}

const airspaceIcaoClasses = [
  { id: 0, name: 'A' },
  { id: 1, name: 'B' },
  { id: 2, name: 'C' },
  { id: 3, name: 'D' },
  { id: 4, name: 'E' },
  { id: 5, name: 'F' },
  { id: 6, name: 'G' },
  { id: 7, name: 'UNCLASSIFIED / SUA (Special Use Airspace)' },
  { id: 8, name: 'Other' },
]
export const getAirspaceIcaoClasses = () => {
  return airspaceIcaoClasses
}
export const getIcaoClassNameById = (id: number) => {
  const icaoClass = airspaceIcaoClasses.find((c) => c.id === id)
  if (icaoClass) {
    return icaoClass.name
  }
  return ''
}

addInitializer(loadAirspaces, 'loadAirspaces')

interface Airspace {
  id: string
  name: string
  type: number
  icaoClass: number
  activity: boolean
  onDemand: boolean
  onRequest: boolean
  byNotam: boolean
  specialAgreement: boolean
  geometry: {
    type: string
    coordinates: number[][][]
  }
  country: string
  upperLimit: AirspaceLimit
  lowerLimit: AirspaceLimit
  createdAt: string
  updatedAt: string
  createdBy: string
  updatedBy: string
  __v: number
  hoursOfOperation: {
    operatingHours: OperatingHour[]
  }
  requestCompliance: boolean
  dataIngestion: boolean
}

interface AirspaceLimit {
  value: number
  unit: number
  referenceDatum: number
}

interface OperatingHour {
  dayOfWeek: number
  startTime: string
  endTime: string
  byNotam: boolean
  sunrise: boolean
  sunset: boolean
  publicHolidaysExcluded: boolean
}
