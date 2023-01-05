import { getDataByKey, setDataByKey } from '../database'

export const getWeatherApiKey = async (): Promise<string | null> => {
  return await getDataByKey('weather_api_key')
}

export const setWeatherApiKey = async (apiKey: string) => {
  await setDataByKey('weather_api_key', apiKey)
}
