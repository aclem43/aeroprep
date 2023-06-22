import { ref } from 'vue'

import { getSimpleDataByKey, setSimpleDataByKey } from '../database'
import { addInitializer } from '../initialize'
import { openAlert } from '../utils/alert'

export const mapAirspaceEnabledRef = ref(true)
export const mapAirportsEnabledRef = ref(true)

export const getMapAirspace = async (): Promise<boolean> => {
  const mapAirspaceEnabled = await getSimpleDataByKey(
    'settings_map_airspace_enabled'
  )
  mapAirspaceEnabledRef.value = mapAirspaceEnabled == 'true'
  if (mapAirspaceEnabled == null) {
    return true
  }
  return mapAirspaceEnabled == 'true'
}

export const setMapAirspace = async (mapAirspaceEnabled: boolean) => {
  await setSimpleDataByKey(
    'settings_map_airspace_enabled',
    mapAirspaceEnabled,
    true
  )
  mapAirspaceEnabledRef.value = mapAirspaceEnabled
}

export const getMapAirports = async (): Promise<boolean> => {
  const mapAirportsEnabled = await getSimpleDataByKey(
    'settings_map_airports_enabled'
  )
  mapAirportsEnabledRef.value = mapAirportsEnabled == 'true'
  if (mapAirportsEnabled == null) {
    return true
  }
  return mapAirportsEnabled == 'true'
}

export const setMapAirports = async (mapAirportsEnabled: boolean) => {
  await setSimpleDataByKey(
    'settings_map_airports_enabled',
    mapAirportsEnabled,
    true
  )
  mapAirportsEnabledRef.value = mapAirportsEnabled
}

addInitializer(() => {
  getMapAirspace()
  getMapAirports()
}, 'getMapSettings')

export const getOpenAipApiKey = async (): Promise<string> => {
  const openAipApiKey = await getSimpleDataByKey('settings_openaip_api_key')
  if (openAipApiKey == null) {
    openAlert('OpenAIP API Key not set')
    return ''
  }
  return openAipApiKey
}
export const setOpenAipApiKey = async (openAipApiKey: string) => {
  await setSimpleDataByKey('settings_openaip_api_key', openAipApiKey, true)
}
