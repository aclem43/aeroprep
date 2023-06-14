import { ref } from 'vue'
import { addInitializer } from '../initialize'
import { getOpenAipApiKey } from '../settings/mapsettings'

const airspaces = ref<Airspace[]>([])

export const loadAirspaces = async () => {
  const apiKey = await getOpenAipApiKey()
  const json = await fetch(
    `https://api.core.openaip.net/api/airspaces?apiKey=${apiKey}&country=AU&limit=200`
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

export const airspaceTypes = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'UNCLASSIFIED / SUA (Special Use Airspace)',
  'Other',
]

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
