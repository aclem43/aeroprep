import { addInitializer } from '@/scripts/initialize'
import { getOpenAipApiKey } from '@/scripts/settings/mapsettings'
import { calcluatePolygonArea } from '@/scripts/utils/area'
import { isEmpty } from '@/scripts/utils/utils'
import { ref } from 'vue'

const airspaces = ref<Airspace[]>([])
const airspaceLimit = ref(200)
const icaoClassIncluded = ref([0, 1, 2, 3, 4, 5, 6])

export const loadAirspaces = async () => {
  const apiKey = await getOpenAipApiKey()
  if (isEmpty(apiKey)) {
    return
  }

  let icaoClassQueryString = ''
  icaoClassIncluded.value.forEach((icaoClass) => {
    icaoClassQueryString = icaoClassQueryString + `&icaoClass=${icaoClass}`
  })
  const json = await fetch(
    `https://api.core.openaip.net/api/airspaces?apiKey=${apiKey}&country=AU&limit=${airspaceLimit.value}${icaoClassQueryString}`
  )
  const data = await json.json()
  airspaces.value = data.items
  airspaces.value.sort(sortAirspaces)
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
export const getAirspaceLimit = () => {
  return airspaceLimit
}

const airspaceIcaoClasses: { id: number; name: string; colour: string }[] = [
  { id: 1, name: 'A', colour: '#2c1ce6' },
  { id: 2, name: 'B', colour: '#2c1ce6' },
  { id: 3, name: 'C', colour: '#1cb3e6' },
  { id: 4, name: 'D', colour: '#e6991c' },
  { id: 5, name: 'E', colour: '#7112b5' },
  { id: 6, name: 'F', colour: '#7cb550' },
  { id: 7, name: 'G', colour: '#07b340' },
  { id: 7, name: 'UNCLASSIFIED / SUA (Special Use Airspace)', colour: 'red' },
  { id: 8, name: 'Other', colour: 'red' },
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

export const getClassColour = (id: number): string => {
  const colour = airspaceIcaoClasses.find((c) => c.id === id)?.colour
  if (colour) {
    return colour
  }
  return '#07b340'
}

const sortAirspaces = (a: Airspace, b: Airspace) => {
  if (
    calcluatePolygonArea(a.geometry.coordinates) >
    calcluatePolygonArea(b.geometry.coordinates)
  ) {
    return -1
  }
  if (
    calcluatePolygonArea(a.geometry.coordinates) <
    calcluatePolygonArea(b.geometry.coordinates)
  ) {
    return 1
  } else {
    return 0
  }
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
