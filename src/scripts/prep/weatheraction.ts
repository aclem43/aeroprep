import {
  CapacitorHttp,
  type HttpOptions,
  type HttpResponse,
} from '@capacitor/core'

import type {
  ResponseTaf,
  ResponseMetar,
  Weather,
} from '@/models/WeatherModels'
import { getWeatherApiKey } from '../settings/apiKeys'
const apiKey = await getWeatherApiKey()

export const getMetar = (
  airportCode: string,
  nearest?: boolean
): Promise<HttpResponse> => {
  if (nearest == null) {
    nearest = false
  }
  let url = `https://api.checkwx.com/metar/${airportCode}/decoded`
  if (nearest) {
    url = `https://api.checkwx.com/metar/${airportCode}/nearest/decoded`
  }

  const options: HttpOptions = {
    url: url,
    headers: { 'X-API-Key': apiKey ?? 'NOAPIKEY' },
  }
  return CapacitorHttp.get(options)
}

export const getTaf = (
  airportCode: string,
  nearest?: boolean
): Promise<HttpResponse> => {
  if (nearest == null) {
    nearest = false
  }
  let url = `https://api.checkwx.com/taf/${airportCode}/decoded`
  if (nearest) {
    url = `https://api.checkwx.com/taf/${airportCode}/nearest/decoded`
  }

  const options: HttpOptions = {
    url: url,
    headers: { 'X-API-Key': apiKey ?? 'NOAPIKEY' },
  }
  return CapacitorHttp.get(options)
}

export const getWeather = async (
  airport: string,
  nearest: boolean
): Promise<Weather> => {
  const metar: ResponseMetar = await (await getMetar(airport, nearest)).data
  const taf: ResponseTaf = await (await getTaf(airport, nearest)).data

  const weather: Weather = {
    metar: metar.data[0],
    taf: taf.data[0],
    station: metar.data[0].station,
  }
  return weather
}
