import { addInitializer } from '@/scripts/initialize'
import { getOpenAipApiKey } from '@/scripts/settings/mapsettings'
import { getCachedData } from '@/scripts/utils/cache'
import { isEmpty } from '@/scripts/utils/utils'
import { ref } from 'vue'

const airports = ref<Airport[]>([])

export const loadAirports = async () => {
  const apiKey = await getOpenAipApiKey()
  if (isEmpty(apiKey)) {
    return
  }
  const json = await getCachedData(
    `https://api.core.openaip.net/api/airports?apiKey=${apiKey}&country=AU`
  )
  const data = JSON.parse(json)
  airports.value = data.items
}

addInitializer(loadAirports, 'loadAirports')

export const getAirports = () => {
  return airports
}

export interface Airport {
  _id: string
  name: string
  icaoCode: string
  type: number
  trafficType: number[]
  magneticDeclination: number
  country: string
  geometry: {
    type: string
    coordinates: number[]
  }
  elevation: {
    value: number
    unit: number
    referenceDatum: number
  }
  ppr: boolean
  private: boolean
  skydiveActivity: boolean
  winchOnly: boolean
  createdAt: Date
  updatedAt: Date
  createdBy: string
  updatedBy: string
  elevationGeoid: {
    geoidHeight: number
    hae: number
  }
  __v: number
}
